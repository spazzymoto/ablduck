/**
 * Tree for classes.
 */
Ext.define('Docs.view.prc.Tree', {
    extend: 'Docs.view.DocTree',
    alias: 'widget.proceduretree',
    requires: [
        'Docs.view.prc.PropathLogic',
        'Docs.Settings'
    ],

    /**
     * @cfg {Object[]} data (required)
     * An array of classes
     */

    initComponent: function() {
        this.setLogic();

        this.dockedItems = [
            {
                xtype: 'container',
                dock: 'bottom',
                layout: 'hbox',
                items: [
                    {width: 34}
                ]
            }
        ];

        this.callParent();
    },

    setLogic: function(logic) {

        var tree = new Docs.view.prc.PropathLogic({procedures: this.data});
        if (this.root) {
            // remember the current selection
            var selected = this.getSelectionModel().getLastSelected();
            // create new treestructure
            var nodes = tree.create();
            this.expandLonelyNode(nodes.root);
            this.setRootNode(nodes.root);
            this.initNodeLinks();

            // re-establish the previous selection
            selected && this.selectUrl(selected.raw.url);
        }
        else {
            var nodes = tree.create();
            this.root = nodes.root;
            this.expandLonelyNode(this.root);
        }
    },

    // When only one expandable node at root level, expand it
    expandLonelyNode: function(root) {
        var expandableNodes = Ext.Array.filter(root.children, function(node) {
            return node.children.length > 0;
        });
        if (expandableNodes.length == 1) {
            expandableNodes[0].expanded = true;
        }
    },

    /**
     * Returns node data, looking also from private nodes.
     * @param {String} url
     * @return {Object}
     */
    findRecordByUrl: function(url) {
        return this.callParent([url]);
    }
});
