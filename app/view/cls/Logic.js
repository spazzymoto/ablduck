/**
 * Base class for class tree structure logic.
 *
 * Subclasses must implement the create() method.
 */
Ext.define('Docs.view.cls.Logic', {
    /**
     * @cfg {Object[]} classes (required) An array of classes.
     * @cfg {String} classes.name
     * @cfg {String} classes.extends
     * @cfg {String} classes.icon
     */

    /**
     * Initializes tree creator.
     * @param {Object} cfg
     */
    constructor: function(cfg) {
        Ext.apply(this, cfg);
    }
});
