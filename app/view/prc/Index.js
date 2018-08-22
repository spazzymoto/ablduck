/**
 * List of classes, grouped into categories.
 */
Ext.define('Docs.view.prc.Index', {
    extend: 'Ext.container.Container',
    alias: 'widget.procedureindex',
    requires: [
        'Docs.ContentGrabber'
    ],
    mixins: ['Docs.view.Scrolling'],
    cls: 'class-categories iScroll',
    margin: '15 10',
    autoScroll: true,

    initComponent: function() {
        this.tpl = new Ext.XTemplate(
            '<h1 class="top" style="padding-bottom: 10px">Procedure Documentation</h1>',
            '<tpl if="notice">',
                '<div class="notice">{notice}</div>',
            '</tpl>',
            '{categories}',
            '{news}'
        );
        this.data = {
            notice: Docs.data.message || Docs.ContentGrabber.get("notice-text"),
            categories: Docs.ContentGrabber.get("categories-content"),
            news: Docs.ContentGrabber.get("news-content")
        };

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent(arguments);
    },

    /**
     * Returns tab config for classes page if at least one class.
     * @return {Object}
     */
    getTab: function() {
        var enabled = (Docs.data.procedures || []).length > 0;
        return enabled ? {cls: 'procedures', href: '#!/procedure', tooltip: 'Procedure Documentation'} : false;
    }
});
