/**
 * Panel that displays class documentation.
 * Including the toolbar and some behavior.
 */
Ext.define('Docs.view.prc.Overview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.procedureoverview',
    requires: [
        'Docs.view.prc.Toolbar',
        'Docs.view.examples.Inline',
        'Docs.view.prc.MemberWrap',
        'Docs.Syntax',
        'Docs.Settings',
    ],
    mixins: ['Docs.view.Scrolling'],

    cls: 'class-overview iScroll',
    autoScroll: true,
    border: false,
    bodyPadding: '20 8 20 5',

    initComponent: function() {
        this.addEvents(
            /**
             * @event
             * Fired after class docs loaded panel.
             */
            'afterload'
        );

        this.callParent(arguments);
    },

    /**
     * Scrolls the specified element into view
     *
     * @param {String} query  DomQuery selector string.
     * @param {String} offset  Additional scroll offset.
     */
    scrollToEl: function(query, offset) {
        var el = (typeof query == 'string') ? Ext.get(Ext.query(query)[0]) : query;
        if (el) {
            var isMember = el.hasCls("member");

            // First make the element visible.
            // For example a private member might be hidden initially
            // so we can't scroll to it. But the element might be
            // inside a section that's fully hidden, in such case we
            // also make the section visible.
            el.show();
            if (!el.isVisible(true)) {
                el.up(".subsection").show();
                el.up(".members-section").show();
            }

            // expand the element
            if (isMember && el.down(".expandable")) {
                this.setMemberExpanded(query.replace(/#/, ''), true);
            }

            var top = this.body.getBox().y;
            this.scrollToView(el, {
                highlight: true,
                offset: (offset || 0) - (isMember ? top : top - 10)
            });
        }
    },

    /**
     * Renders class documentation in this panel.
     *
     * @param {Object} docClass
     */
    load: function(docClass) {
        if (!Docs.data.classLinkCache)
            Docs.data.classLinkCache = {};

        this.docClass = docClass;

        if (this.toolbar) {
            // Workaround for bug in ExtJS.
            // 1. autoDestroy needs to be set to fals explicitly
            // 2. using autoDestroy=true doesn't work, don't know why
            //    but destroying the toolbar explicitly afterwards works fine.
            this.removeDocked(this.toolbar, false);
            this.toolbar.destroy();
        }
        this.toolbar = Ext.create('Docs.view.prc.Toolbar', {
            docClass: this.docClass,
            listeners: {
                filter: function(search, show) {
                    this.filterMembers(search, show);
                },
                menubuttonclick: function(type) {
                    this.scrollToEl("h3.members-title.icon-"+type, -20);
                },
                scope: this
            }
        });
        this.addDocked(this.toolbar);

        var tpl = new Ext.XTemplate(
            "<div>",
                "<tpl if=\"author\">",
                    "<pre class=\"hierarchy\">",
                        "<tpl if=\"author\">",
                            "<h4>Author</h4>",
                            "<div class=\"dependency\">{author}</div>",
                        "</tpl>",
                    "</pre>",
                "</tpl>",
                "<div class=\"doc-contents\">",
                    "<tpl if=\"meta.internal\">",
                        "<div class=\"rounded-box private-box\">",
                            "<p><strong>NOTE:</strong>This {tagname} is for internal use only. Don't rely on its existence.</p>",
                        "</div>",
                        "</br>",
                    "</tpl>",
                    "<tpl if=\"meta.deprecated\">",
                        "<div class=\"rounded-box deprecated-box deprecated-tag-box\">",
                            "<p>This {tagname} has been <strong>deprecated</strong> since {meta.deprecated.version}</p>",
                            "{meta.deprecated.text}",
                        "</div>",
                        "</br>",
                    "</tpl>",
                    "{comment}",

                    "<br>",
                    "<tpl if=\"parameters\">",
                        "<h3 class=\"pa\">Main Block Parameters</h3>",
                        "<ul class=\"main\">",
                            "<tpl for=\"parameters\">",
                                "<li>",
                                    "<span class=\"pre\">{mode} {name} : {[this.datatypeLink(values.datatype)]}</span>",
                                    "<div class=\"sub-desc\">",
                                        "{comment}",
                                    "</div>",
                                "</li>",
                            "</tpl>",
                        "</ul>",
                        
                    "</tpl>",
                "</div>",
                
                "<div class=\"members\">",
                    "<tpl if=\"this.hasMember(members, 'procedure')\">",
                        "<div class=\"members-section\">",
                            "<h3 class=\"members-title icon-constructor\">Internal Procedures</h3>",
                            "<div class=\"subsection\">",

                                "<tpl for=\"members\">",
                                    "<tpl if=\"tagname == 'procedure'\">",
                                        "<div id=\"{id}\" rel=\"{parent.name}\" class=\"member <tpl if=\"xindex===1\"> first-child</tpl>\">",
                                            "<a href=\"#\" class=\"side expandable\"><span>&nbsp;</span></a>",
                                            "<div class=\"title\">",
                                                "<a href=\"#!/procedure/{parent.name}-procedure-{id}\" class=\"name expandable\">{name}</a>( ",
                                                    "<tpl for=\"parameters\">",
                                                        "<tpl if=\"xindex!==1\">, </tpl>{mode} {name}",
                                                    "</tpl>",
                                                " )",
                                                "<span class=\"signature\">",
                                                    "<tpl if=\"meta.internal\"><span class=\"internal\">INTERNAL</span></tpl>",
                                                    "<tpl if=\"meta.private\"><span class=\"private\">PRIVATE</span></tpl>",
                                                    "<tpl if=\"meta.deprecated\"><span class=\"deprecated\">DEPRECATED</span></tpl>",
                                                "</span>",
                                            "</div>",

                                            "<div class=\"description\">",
                                                "<div class=\"short\">{[this.getShortDoc(values.comment)]}</div>",
                                                "<div class=\"long\">",
                                                    "<tpl if=\"meta.internal\">",
                                                        "<div class=\"rounded-box private-box\">",
                                                            "<p><strong>NOTE:</strong>This {tagname} is for internal use only. Don't rely on its existence.</p>",
                                                        "</div>",
                                                        "</br>",
                                                    "</tpl>",
                                                    "<tpl if=\"meta.deprecated\">",
                                                        "<div class=\"rounded-box deprecated-box deprecated-tag-box\">",
                                                            "<p>This {tagname} has been <strong>deprecated</strong> since {meta.deprecated.version}</p>",
                                                            "{meta.deprecated.text}",
                                                        "</div>",
                                                        "</br>",
                                                    "</tpl>",
                                                    "{comment}",

                                                    "<br>",
                                                    "<tpl if=\"parameters\">",
                                                        "<h3 class=\"pa\">Parameters</h3>",
                                                        "<ul>",
                                                            "<tpl for=\"parameters\">",
                                                                "<li>",
                                                                    "<span class=\"pre\">{mode} {name} : {[this.datatypeLink(values.datatype)]}</span>",
                                                                    "<div class=\"sub-desc\">",
                                                                        "{comment}",
                                                                    "</div>",
                                                                "</li>",
                                                            "</tpl>",
                                                        "</ul>",
                                                        
                                                    "</tpl>",
                                                "</div>",
                                            "</div>",
                                        "</div>",
                                    "</tpl>",
                                "</tpl>",

                            "</div>",
                        "</div>",
                    "</tpl>",

                    "<tpl if=\"this.hasMember(members, 'function')\">",
                        "<div class=\"members-section\">",
                            "<h3 class=\"members-title icon-constructor\">Internal Functions</h3>",
                            "<div class=\"subsection\">",

                                "<tpl for=\"members\">",
                                    "<tpl if=\"tagname == 'function'\">",
                                        "<div id=\"{id}\" rel=\"{parent.name}\" class=\"member <tpl if=\"xindex===1\"> first-child</tpl>\">",
                                            "<a href=\"#\" class=\"side expandable\"><span>&nbsp;</span></a>",
                                            "<div class=\"title\">",
                                                "<a href=\"#!/procedure/{parent.name}-function-{id}\" class=\"name expandable\">{name}</a>( ",
                                                    "<tpl for=\"parameters\">",
                                                        "<tpl if=\"xindex!==1\">, </tpl>{mode} {name}",
                                                    "</tpl>",
                                                " ) : {[this.datatypeLink(values.returns.datatype)]}",
                                                "<span class=\"signature\">",
                                                    "<tpl if=\"meta.internal\"><span class=\"internal\">INTERNAL</span></tpl>",
                                                    "<tpl if=\"meta.private\"><span class=\"private\">PRIVATE</span></tpl>",
                                                    "<tpl if=\"meta.deprecated\"><span class=\"deprecated\">DEPRECATED</span></tpl>",
                                                "</span>",
                                            "</div>",

                                            "<div class=\"description\">",
                                                "<div class=\"short\">{[this.getShortDoc(values.comment)]}</div>",
                                                "<div class=\"long\">",
                                                    "<tpl if=\"meta.internal\">",
                                                        "<div class=\"rounded-box private-box\">",
                                                            "<p><strong>NOTE:</strong>This {tagname} is for internal use only. Don't rely on its existence.</p>",
                                                        "</div>",
                                                        "</br>",
                                                    "</tpl>",
                                                    "<tpl if=\"meta.deprecated\">",
                                                        "<div class=\"rounded-box deprecated-box deprecated-tag-box\">",
                                                            "<p>This {tagname} has been <strong>deprecated</strong> since {meta.deprecated.version}</p>",
                                                            "{meta.deprecated.text}",
                                                        "</div>",
                                                        "</br>",
                                                    "</tpl>",
                                                    "{comment}",

                                                    "<br>",
                                                    "<tpl if=\"parameters\">",
                                                        "<h3 class=\"pa\">Parameters</h3>",
                                                        "<ul>",
                                                            "<tpl for=\"parameters\">",
                                                                "<li>",
                                                                    "<span class=\"pre\">{mode} {name} : {[this.datatypeLink(values.datatype)]}</span>",
                                                                    "<div class=\"sub-desc\">",
                                                                        "{comment}",
                                                                    "</div>",
                                                                "</li>",
                                                            "</tpl>",
                                                        "</ul>",
                                                        
                                                    "</tpl>",
                                                    "<h3 class=\"pa\">Returns</h3>",
                                                    "<ul>",
                                                        "<li>",
                                                            "<span class=\"pre\">{[this.datatypeLink(values.returns.datatype)]}</span>",
                                                            "<div class=\"sub-desc\">",
                                                                "{returns.comment}",
                                                            "</div>",
                                                        "</li>",
                                                    "</ul>",
                                                "</div>",
                                            "</div>",
                                        "</div>",
                                    "</tpl>",
                                "</tpl>",

                            "</div>",
                        "</div>",
                    "</tpl>",

                "</div>",
                
            "</div>",
            {
                hasMember: function(members, tagname) {
                    var foundMember = false;
                    Ext.Array.forEach(members, function(member) {
                        if (member.tagname == tagname) {
                            foundMember = true;
                            return;
                        }
                    }, this);
                    return foundMember;
                },

                getShortDoc: function(comment) {
                    // TODO: strip html tags properly
                    return comment.replace(/<.*?>/g, '').substring(0, 100);
                },

                datatypeLink: function(datatype) {

                    if (Docs.data.classLinkCache[datatype]){
                        console.log('cache hit');
                        return Docs.data.classLinkCache[datatype];
                    }

                    for (var i = 0; i < Docs.data.classes.length; i++) {
                        var lookupClass = Docs.data.classes[i];
                        if (lookupClass.name == datatype) {
                            Docs.data.classLinkCache[datatype] = "<a href=\"#!/class/" + datatype + "\" rel=\"" + datatype + "\" class=\"docClass\">" + datatype + "</a>";
                            return Docs.data.classLinkCache[datatype];
                        }
                    }

                    return datatype;
                }
            }
        );

        this.update(tpl.apply(docClass));

        Docs.Syntax.highlight(this.getEl());

        this.filterMembers("", Docs.Settings.get("show"));

        
        this.initBasicMemberWrappers();
        
        this.fireEvent('afterload');
    },

    initBasicMemberWrappers: function() {
        this.memberWrappers = {};
        Ext.Array.forEach(Ext.query('.member'), function(memberEl) {
            var wrap = new Docs.view.cls.MemberWrap({
                el: memberEl
            });
            this.memberWrappers[wrap.getMemberId()] = wrap;
        }, this);
    },

    /**
     * Expands or collapses the given member.
     * @param {String} memberName
     * @param {Boolean} expanded
     */
    setMemberExpanded: function(memberName, expanded) {
        this.memberWrappers[memberName].setExpanded(expanded);
    },

    /**
     * True when the given member is expanded.
     * @param {String} memberName
     * @return {Boolean}
     */
    isMemberExpanded: function(memberName) {
        return this.memberWrappers[memberName].isExpanded();
    },

    /**
     * Expands/collapses all members.
     */
    setAllMembersExpanded: function(expanded) {
        Ext.Object.each(this.memberWrappers, function(name, wrap) {
            wrap.setExpanded(expanded);
        }, this);
    },

    /**
     * Filters members by search string and inheritance.
     * @param {String} search
     * @param {Object} show
     * @private
     */
    filterMembers: function(search, show) {
        Docs.Settings.set("show", show);
        var isSearch = search.length > 0;

        // Hide the class documentation when filtering
        Ext.Array.forEach(Ext.query('.doc-contents, .hierarchy'), function(el) {
            Ext.get(el).setStyle({display: isSearch ? 'none' : 'block'});
        });

        // Only show members who's name matches with the search string
        // and its type is currently visible
        var re = new RegExp(Ext.String.escapeRegex(search), "i");
        this.eachMember(function(m) {
            var el = Ext.get(m.id);
            var visible = !(
                !show['public']    && !(m.meta['private'] || m.meta['protected']) ||
                !show['protected'] && m.meta['protected'] ||
                !show['private']   && m.meta['private'] ||
                !show['deprecated'] && m.meta['deprecated'] ||
                !show['internal'] && m.meta['internal'] ||
                isSearch           && !re.test(m.name)
            );

            if (visible) {
                el.setStyle({display: 'block'});
            }
            else {
                el.setStyle({display: 'none'});
            }
        }, this);

        // Remove all first-child classes
        Ext.Array.forEach(Ext.query('.member.first-child'), function(m) {
            Ext.get(m).removeCls('first-child');
        });

        Ext.Array.forEach(Ext.query('.members-section'), function(section) {
            // Hide the section completely if all items in it are hidden
            var visibleEls = this.getVisibleElements(".member", section);
            Ext.get(section).setStyle({display: visibleEls.length > 0 ? 'block' : 'none'});

            // Hide subsections completely if all items in them are hidden
            Ext.Array.forEach(Ext.query(".subsection", section), function(subsection) {
                var visibleEls = this.getVisibleElements(".member", subsection);
                if (visibleEls.length > 0) {
                    // add first-child class to first member in subsection
                    visibleEls[0].addCls('first-child');
                    // make sure subsection is visible
                    Ext.get(subsection).setStyle({display: 'block'});
                }
                else {
                    // Hide subsection completely if empty
                    Ext.get(subsection).setStyle({display: 'none'});
                }
            }, this);
        }, this);

        this.toolbar.showMenuItems(show, isSearch, re);
    },

    getVisibleElements: function(selector, root) {
        var els = Ext.Array.map(Ext.query(selector, root), function(node) {
            return Ext.get(node);
        });
        return Ext.Array.filter(els, function(el) {
            return el.isVisible();
        });
    },

    // Loops through each member of class
    eachMember: function(callback, scope) {
        Ext.Array.forEach(this.docClass.members, callback, scope);
    }

});
