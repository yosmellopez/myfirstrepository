Ext.define("Registro.plugins.MultiSelector", {
    extend: Ext.grid.Panel,
    xtype: "multiselector",
    config: {search: {xtype: "multiselector-search", width: 200, height: 200, store: {autoLoad: true}}},
    fieldName: "name",
    fieldTitle: null,
    removeRowText: "✖",
    removeRowTip: "Eliminar este elemento",
    emptyText: "Nada seleccionado",
    addToolText: "Buscar elementos para insertar",
    initComponent: function () {
        var k = this, i = k.emptyText, n = k.getStore(), l = k.getSearch(), j = k.fieldTitle, h, m;
        h = l.store;
        if (h.isStore) {
            m = h.getModel();
        } else {
            m = h.model;
        }
        if (!n) {
            k.store = {model: m};
        }
        if (i && !k.viewConfig) {
            k.viewConfig = {deferEmptyText: false, emptyText: i};
        }
        if (!k.columns) {
            k.hideHeaders = !j;
            k.columns = [{text: j, dataIndex: k.fieldName, flex: 1}, k.makeRemoveRowColumn()];
        }
        k.callParent();
    },
    addTools: function () {
        this.addTool({type: "plus", tooltip: this.addToolText, callback: "onShowSearch", scope: this});
    },
    convertSearchRecord: Ext.identityFn,
    convertSelectionRecord: Ext.identityFn,
    makeRemoveRowColumn: function () {
        var b = this;
        return {
            width: 22,
            menuDisabled: true,
            tdCls: Ext.baseCSSPrefix + "multiselector-remove",
            processEvent: b.processRowEvent.bind(b),
            renderer: b.renderRemoveRow,
            updater: Ext.emptyFn,
            scope: b
        };
    },
    processRowEvent: function (m, p, j, o, n, l, e, k) {
        if (l.type !== "click") {
            return;
        }
        if (Ext.fly(j).hasCls(Ext.baseCSSPrefix + "multiselector-remove")) {
            this.store.remove(e);
            if (this.searchPopup) {
                this.searchPopup.deselectRecords(e);
            }
        }
    },
    renderRemoveRow: function () {
        return '<span data-qtip="' + this.removeRowTip + '" role="button">' + this.removeRowText + "</span>";
    },
    beforeDestroy: function () {
        Ext.un({mousedown: "onDismissSearch", scope: this});
        this.callParent();
    },
    privates: {
        onDismissSearch: function (c) {
            var d = this.searchPopup;
            if (d && !(d.owns(c.getTarget()) || this.owns(c.getTarget()))) {
                Ext.un({mousedown: "onDismissSearch", scope: this});
                d.hide();
            }
        }, onShowSearch: function (f, i) {
            var h = this, g = h.searchPopup, j = h.getStore();
            if (!g) {
                g = Ext.merge({owner: h, field: h.fieldName, floating: true}, h.getSearch());
                h.searchPopup = g = h.add(g);
                if (j.getCount()) {
                    g.selectRecords(j.getRange());
                }
            }
            g.showBy(h, "tl-tr?");
            Ext.on({mousedown: "onDismissSearch", scope: h});
        }
    }
});