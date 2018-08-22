/**
 * Controller responsible for loading procedures
 */
Ext.define('Docs.controller.Procedures', {
    extend: 'Docs.controller.Content',
    baseUrl: '#!/procedure',
    title: 'API Documentation',

    requires: [
        'Docs.History',
        'Docs.Syntax',
        'Docs.ProcedureRegistry'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: '#viewport'
        },
        {
            ref: 'index',
            selector: '#procedureindex'
        },
        {
            ref: 'header',
            selector: 'procedureheader'
        },
        {
            ref: 'overview',
            selector: 'procedureoverview'
        },
        {
            ref: 'tabPanel',
            selector: 'proceduretabpanel'
        },
        {
            ref: 'tree',
            selector: '#proceduretree'
        },
        {
            ref: 'favoritesGrid',
            selector: '#favorites-grid'
        }
    ],

    cache: {},

    init: function() {
        this.addEvents(
            /**
             * @event showIndex  Fired after index is shown.
             */
            "showIndex",

            /**
             * @event showProcedure
             * Fired after class shown. Used for analytics event tracking.
             * @param {String} cls  name of the class.
             * @param {Object} options
             * @param {Boolean} options.reRendered true if the class was re-rendered
             */
            "showProcedure",

            /**
             * @event showMember
             * Fired after class member scrolled to view. Used for analytics event tracking.
             * @param {String} cls  name of the class.
             * @param {String} anchor  name of the member in form type-name like "method-bind".
             */
            "showMember"
        );

        Ext.getBody().addListener('click', function(event, el) {
            this.handleUrlClick(decodeURI(el.href), event);
        }, this, {
            preventDefault: true,
            delegate: '.docClass'
        });

        this.control({
            'proceduretree': {
                urlclick: function(url, event) {
                    this.handleUrlClick(url, event, this.getTree());
                }
            },

            'toolbar': {
                toggleExpanded: function(expanded) {
                    this.getOverview().setAllMembersExpanded(expanded);
                }
            },

            'procedureoverview': {
                afterrender: function(cmp) {
                    // Expand member when clicked
                    cmp.el.addListener('click', function(cmp, el) {
                        var member = Ext.get(el).up('.member'),
                            clsName = member.getAttribute('rel'),
                            memberName = member.getAttribute('id');

                        if (this.getOverview().isMemberExpanded(memberName)) {
                            this.setExpanded(memberName, false);
                        }
                        else {
                            this.setExpanded(memberName, true);
                            this.fireEvent('showMember', clsName, memberName);
                        }
                    }, this, {
                        preventDefault: true,
                        delegate: '.expandable'
                    });

                    // Do nothing when clicking on not-expandable items
                    cmp.el.addListener('click', Ext.emptyFn, this, {
                        preventDefault: true,
                        delegate: '.not-expandable'
                    });
                }
            },

            'treecontainer': {
                afterrender: function(cmp) {
                    cmp.el.addListener('dblclick', function() {
                        if (cmp.getWidth() < 30) {
                            cmp.setWidth(cmp.expandedWidth);
                        } else {
                            cmp.expandedWidth = cmp.getWidth();
                            cmp.setWidth(20);
                        }
                    }, this, {
                        delegate: '.x-resizable-handle'
                    });
                }
            },

            'doctabs': {
                tabClose: function(url) {
                    this.getOverview().eraseScrollContext(url);
                }
            }
        });
    },

    // Expands the member and remembers the expanded state of a member
    // of current class
    setExpanded: function(member, expanded) {
        var prc = this.currentPrc;
        if (!prc.expanded) {
            prc.expanded = {};
        }

        this.getOverview().setMemberExpanded(member, expanded);

        if (expanded) {
            prc.expanded[member] = expanded;
        }
        else {
            delete prc.expanded[member];
        }
    },

    // Expands
    applyExpanded: function(prc) {
        Ext.Object.each(prc.expanded || {}, function(member) {
            Ext.get(member).addCls("open");
        }, this);
    },

    // We don't want to select the class that was opened in another window,
    // so restore the previous selection.
    handleUrlClick: function(url, event, view) {
        // If not for me bail
        if (!(/#!?\/procedure/.test(url))) 
            return false;

        url = Docs.History.cleanUrl(url);

        if (this.opensNewWindow(event)) {
            window.open(url);
            view && view.selectUrl(this.currentPrc ? "#!/procedure/"+this.currentPrc.name : "");
        }
        else {
            this.loadProcedure(url);
        }
    },

    /**
     * Loads main page.
     *
     * @param {Boolean} noHistory  true to disable adding entry to browser history
     */
    loadIndex: function(noHistory) {
        Ext.getCmp('treecontainer').showTree('proceduretree');
        this.callParent(arguments);
        this.fireEvent('showIndex');
    },

    /**
     * Loads class.
     *
     * @param {String} url  name of the class + optionally name of the method, separated with dash.
     * @param {Boolean} noHistory  true to disable adding entry to browser history
     */
    loadProcedure: function(url, noHistory) {
        Ext.getCmp('card-panel').layout.setActiveItem('procedurecontainer');
        Ext.getCmp('treecontainer').showTree('proceduretree');

        noHistory || Docs.History.push(url);

        // separate class and member name
        var matches = url.match(/^#!\/procedure\/(.*?)(?:-(.*))?$/);
        var file = matches[1];
        var fileProtected = file.replace(/(\/|\.)/g, '_');
        var member = matches[2];

        if (this.getOverview()) {
            this.getOverview().setLoading(true);
        }

        if (this.cache[fileProtected]) {
            this.showProcedure(this.cache[fileProtected], member);
        }
        else {
            this.cache[fileProtected] = "in-progress";
            Ext.data.JsonP.request({
                url: this.getBaseUrl() + '/output/procedures/' + fileProtected + '.js',
                callbackName: fileProtected,
                success: function(json, opts) {
                    this.cache[fileProtected] = json;
                    this.showProcedure(json, member);
                },
                failure: function(response, opts) {
                    this.cache[fileProtected] = false;
                    this.getOverview().setLoading(false);
                    this.getController('Failure').show404("Procedure <b>"+Ext.String.htmlEncode(file)+"</b> was not found.");
                },
                scope: this
            });
        }
    },

    showProcedure: function(prc, anchor) {
        var reRendered = false;

        if (prc === "in-progress") {
            return;
        }
        this.getOverview().setLoading(false);

        this.getViewport().setPageTitle(prc.name);
        if (this.currentPrc !== prc) {
            this.currentPrc = prc;
            this.getHeader().load(prc);
            this.getOverview().load(prc);
            this.applyExpanded(prc);
            reRendered = true;
        }
        this.currentPrc = prc;
        this.getOverview().setScrollContext("#!/procedure/"+prc.name);

        if (anchor) {
            this.getOverview().scrollToEl("#" + anchor);
            this.fireEvent('showMember', prc.name, anchor);
        }
        else {
            this.getOverview().restoreScrollState();
        }

        this.getTree().selectUrl("#!/procedure/"+prc.name);
        this.fireEvent('showProcedure', prc.name, {reRendered: reRendered});
    }

});
