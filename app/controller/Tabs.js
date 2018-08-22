/**
 * Controller for tabs. Adds listeners for clicking tabs and their 'close' buttons
 */
Ext.define('Docs.controller.Tabs', {
    extend: 'Ext.app.Controller',
    requires: [
        'Docs.History',
        'Docs.Settings'
    ],

    refs: [
        {
            ref: 'welcomeIndex',
            selector: '#welcomeindex'
        },
        {
            ref: 'classIndex',
            selector: '#classindex'
        },
        {
            ref: 'procedureIndex',
            selector: '#procedureindex'
        },
        {
            ref: 'guideIndex',
            selector: '#guideindex'
        },
        {
            ref: 'videoIndex',
            selector: '#videoindex'
        },
        {
            ref: 'exampleIndex',
            selector: '#exampleindex'
        },
        {
            ref: 'testsIndex',
            selector: '#testsindex'
        },
        {
            ref: 'classTree',
            selector: '#classtree'
        },
        {
            ref: 'procedureTree',
            selector: '#proceduretree'
        },
        {
            ref: 'guideTree',
            selector: '#guidetree'
        },
        {
            ref: 'exampleTree',
            selector: '#exampletree'
        },
        {
            ref: 'videoTree',
            selector: '#videotree'
        },
        {
            ref: 'doctabs',
            selector: '#doctabs'
        }
    ],

    init: function() {
        this.getController('Classes').addListener({
            showClass: function(cls) {
                this.addTabFromTree("#!/class/"+cls);
            },
            scope: this
        });

        this.getController('Procedures').addListener({
            showProcedure: function(cls) {
                this.addTabFromTree("#!/procedure/"+cls);
            },
            scope: this
        });

        this.getController('Guides').addListener({
            showGuide: function(guide) {
                this.addTabFromTree("#!/guide/"+guide);
            },
            scope: this
        });

        this.getController('Examples').addListener({
            showExample: function(example) {
                this.addTabFromTree(example);
            },
            scope: this
        });

        this.getController('Videos').addListener({
            showVideo: function(video) {
                this.addTabFromTree("#!/video/"+video);
            },
            scope: this
        });

        this.control({
            '[componentCls=doctabs]': {
                tabActivate: function(url, opts) {
                    Docs.History.push(url, opts);
                },
                scope: this
            }
        });
    },

    // Open all tabs from previous session
    onLaunch: function() {
        this.getDoctabs().setStaticTabs(Ext.Array.filter([
            this.getWelcomeIndex().getTab(),
            this.getClassIndex().getTab(),
            this.getProcedureIndex().getTab(),
            this.getGuideIndex().getTab(),
            this.getVideoIndex().getTab(),
            this.getExampleIndex().getTab(),
            this.getTestsIndex().getTab()
        ], function(x){return x;}));

        var tabs = Docs.Settings.get('tabs');
        if (tabs) {
            Ext.Array.forEach(tabs, function(url) {
                this.addTabFromTree(url, {animate: false});
            }, this);
        }
        Docs.History.notifyTabsLoaded();
    },

    /**
     * Adds a tab based on information from the class tree
     * @param {String} url The url of the record in the tree
     * @param {Object} [opts={animate: true, activate: true}] Specify to override defaults.
     * @private
     */
    addTabFromTree: function(url, opts) {
        var tree = this.getTree(url);
        var treeRecord = tree.findRecordByUrl(url);
        if (treeRecord) {
            this.addTab(treeRecord, opts);
        }
    },

    // Adds new tab, no questions asked
    addTab: function(tab, opts) {
        opts = opts || { animate: true, activate: true };
        this.getDoctabs().addTab({
            href: tab.url,
            text: tab.text,
            iconCls: tab.iconCls
        }, opts);
    },

    // Determines tree from an URL
    getTree: function(url) {
        if (/#!?\/class/.test(url)) {
            return this.getClassTree();
        }
        else if (/#!?\/procedure/.test(url)) {
            return this.getProcedureTree();
        }
        else if (/#!?\/guide/.test(url)) {
            return this.getGuideTree();
        }
        else if (/#!?\/video/.test(url)) {
            return this.getVideoTree();
        }
        else if (/#!?\/example/.test(url)) {
            return this.getExampleTree();
        }
        else {
            // default to classtree, just in case
            return this.getClassTree();
        }
    }

});
