/**
 * Launcher of the Docs app.
 *
 * To have greater control of all the dependencies and do some
 * additional setup before launching the actual Ext.app.Application
 * instance we're not using the basic Ext.application().
 */
Ext.define('Docs.Application', {
    requires: [
        'Ext.app.Application',
        'Docs.History',
        'Docs.Settings',
        'Docs.view.Viewport',

        'Docs.controller.Welcome',
        'Docs.controller.Failure',
        'Docs.controller.Classes',
        'Docs.controller.Procedures',
        'Docs.controller.Search',
        'Docs.controller.InlineExamples',
        'Docs.controller.Examples',
        'Docs.controller.Guides',
        'Docs.controller.Videos',
        'Docs.controller.Tabs',
        'Docs.controller.Tests'
    ],

    constructor: function() {
        this.createApp();
    },

    createApp: function() {
        new Ext.application({
            name: "Docs",
            controllers: [
                'Welcome',
                'Failure',
                'Classes',
                'Procedures',
                'Search',
                'InlineExamples',
                'Examples',
                'Guides',
                'Videos',
                'Tabs',
                'Tests'
            ],
            launch: this.launch
        });
    },

    launch: function() {
        Docs.App = this;
        Docs.Settings.init();

        Ext.create('Docs.view.Viewport');

        Docs.History.init();

        // When google analytics event tracking script present on page
        if (Docs.initEventTracking) {
            Docs.initEventTracking();
        }

        // Remove loading animated gif from background.
        // Keeping it there will degrade performance.
        Ext.get("loading").remove();

        // setInterval(function(){
        //     Ext.DomQuery.select('link')[2].href = "resources/css/viewport.css?" + Math.ceil(Math.random() * 100000000);
        // }, 1000);
    }
});
