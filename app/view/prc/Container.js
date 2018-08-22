/**
 * The class documentation page. Consists of the header (class name) and tab panel.
 * TODO: Add framework version
 */
Ext.define('Docs.view.prc.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.procedurecontainer',
    requires: [
        'Docs.view.prc.Header',
        'Docs.view.prc.Overview'
    ],

    layout: 'border',

    padding: '5 10 0 10',

    initComponent: function() {
        this.items = [
            Ext.create('Docs.view.prc.Header', {
                region: 'north'
            }),
            Ext.create('Docs.view.prc.Overview', {
                region: 'center'
            })
        ];
        this.callParent(arguments);
    }
});