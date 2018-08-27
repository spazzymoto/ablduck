/**
 * Menu shown by {@link Docs.view.HoverMenuButton}.
 */
Ext.define('Docs.view.HoverMenu', {
    extend: 'Ext.view.View',
    requires: [
        'Docs.view.Signature'
    ],

    alias: 'widget.hovermenu',
    componentCls: 'hover-menu',
    itemSelector: 'div.item',
    deferEmptyText: false,

    /**
     * @cfg {Number} colHeight  maximum number of items in one column.
     * When more than that, items are placed into multiple columns.
     */
    columnHeight: 25,

    initComponent: function() {
        this.renderTo = Ext.getBody();

        this.tpl = new Ext.XTemplate(
            '<table>',
            '<tr>',
                '<td>',
                '<tpl for=".">',
                    '<div class="item">',
                        '{[this.renderLink(values)]}',
                    '</div>',
                    // Start new column when columnHeight reached
                    '<tpl if="xindex % this.columnHeight === 0 && xcount &gt; xindex">',
                        '</td><td>',
                    '</tpl>',
                '</tpl>',
                '</td>',
            '</tr>',
            '</table>',
            {
                columnHeight: this.columnHeight,

                renderLink: function(values) {
                    var tags = Docs.view.Signature.render(values.meta);
                    return Ext.String.format('<a href="#!/{0}/{1}" rel="{1}" class="docClass">{2} {3}</a>', values.baseUrl, values.url, values.label, tags);
                }
            }
        );

        this.callParent();
    }
});
