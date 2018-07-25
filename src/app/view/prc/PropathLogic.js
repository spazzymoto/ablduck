/**
 * Creates package-based tree-structure.
 */
Ext.define('Docs.view.prc.PropathLogic', {
    extend: 'Docs.view.prc.Logic',
    requires: "Docs.ProcedureRegistry",

    /**
     * Creates the tree.
     * @return {Object} Object with two fields:
     * @return {Object} return.root Root node
     */
    create: function() {
        this.root = {
            children: [],
            text: 'Root'
        };
        this.paths = {"": this.root};
        Ext.Array.forEach(this.procedures, this.addFile, this);
        this.sortTree(this.root);
        return {
            root: this.root
        };
    },

    // Sorts all child nodes, and recursively all child paths.
    sortTree: function(node) {
        node.children.sort(this.compare);
        Ext.Array.forEach(node.children, this.sortTree, this);
    },

    // Comparson method that sorts package nodes before class nodes.
    compare: function(a, b) {
        if (a.leaf === b.leaf) {
            var aa = a.text.toLowerCase();
            var bb = b.text.toLowerCase();
            return aa > bb ? 1 : (aa < bb ? -1 : 0);
        }
        else {
            return a.leaf ? 1 : -1;
        }
    },

    // When path for the file exists, add file node to that
    // path; otherwise create the path first.
    addFile: function(prc) {
        var pathName = Docs.ProcedureRegistry.pathName(prc.name);
        var parent = this.paths[pathName] || this.addPath(pathName);
        var node = this.fileNode(prc);
        this.addChild(parent, node);
        this.paths[prc.name] = node;
    },

    // When parent path exists, add new path node into it, also
    // record the path into this.paths hash for quick lookups;
    // otherwise create the parent path first.
    //
    // Note that the root path always exists, so we can safely
    // recurse knowing we will eventually stop.
    addPath: function(name) {
        var pathName = Docs.ProcedureRegistry.pathName(name);
        var parent = this.paths[pathName] || this.addPath(pathName);
        var path = this.pathNode(name);
        this.addChild(parent, path);
        this.paths[name] = path;
        return path;
    },

    // Add child node and ensure parent is no longer marked as a leaf
    addChild: function(parent, child) {
        parent.children.push(child);
        if (parent.leaf) {
            parent.leaf = false;
        }
    },

    // Given full doc object for file creates file node
    fileNode: function(prc) {
      return {
        text: Docs.ProcedureRegistry.fileName(prc.name),
        url: "#!/procedure/"+prc.name,
        iconCls: prc.icon,
        cls: prc["private"] ? "private" : "",
        leaf: true,
        children: []
      };
    },

    // Given full path name like my/path creates path node
    pathNode: function(name) {
      return {
        text: Docs.ProcedureRegistry.fileName(name),
        iconCls: "icon-pkg",
        leaf: false,
        children: []
      };
    }

});
