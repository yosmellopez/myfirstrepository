Ext.define("Seleccion.plugins.MultiSelectorSearch", {
    extend: Ext.panel.Panel,
    xtype: "multiselector-search",
    layout: "fit",
    floating: true,
    resizable: true,
    minWidth: 200,
    minHeight: 200,
    border: true,
    defaultListenerScope: true,
    referenceHolder: true,
    searchText: "Buscar...",
    initComponent: function () {
        var j = this, i = j.owner, m = j.makeItems(), l, k, n, h;
        j.dockedItems = j.makeDockedItems();
        j.items = m;
        h = Ext.data.StoreManager.lookup(j.store);
        for (l = m.length; l--; ) {
            if ((k = m[l]).xtype === "grid") {
                k.store = h;
                k.isSearchGrid = true;
                k.selModel = k.selModel || {
                    type: "checkboxmodel",
                    pruneRemoved: false,
                    listeners: {selectionchange: "onSelectionChange"}
                };
                Ext.merge(k, j.grid);
                if (!k.columns) {
                    k.hideHeaders = true;
                    k.columns = [{flex: 1, dataIndex: j.field}];
                }
                break
            }
        }
        j.callParent();
        n = j.getOwnerStore().getRange();
        if (!i.convertSelectionRecord.$nullFn) {
            for (l = n.length; l--; ) {
                n[l] = i.convertSelectionRecord(n[l]);
            }
        }
        if (h.isLoading() || (h.loadCount === 0 && !h.getCount())) {
            h.on("load", function () {
                var d = n.length, b, c, a = [];
                if (!j.destroyed) {
                    for (b = 0; b < d; b++) {
                        c = h.getById(n[b].getId());
                        if (c) {
                            a.push(c);
                        }
                    }
                    j.selectRecords(a);
                }
            }, null, {single: true});
        } else {
            j.selectRecords(n);
        }
    },
    getOwnerStore: function () {
        return this.owner.getStore();
    },
    afterShow: function () {
        var b = this.lookupReference("searchField");
        this.callParent(arguments);
        if (b) {
            b.focus();
        }
    },
    getSearchStore: function () {
        var b = this.lookupReference("searchGrid");
        return b.getStore();
    },
    makeDockedItems: function () {
        return [{
                xtype: "textfield",
                reference: "searchField",
                dock: "top",
                hideFieldLabel: true,
                emptyText: this.searchText,
                triggers: {
                    clear: {
                        cls: Ext.baseCSSPrefix + "form-clear-trigger",
                        handler: "onClearSearch",
                        hidden: true
                    }
                },
                listeners: {change: "onSearchChange", buffer: 300}
            }];
    },
    makeItems: function () {
        return [{
                xtype: "grid",
                reference: "searchGrid",
                trailingBufferZone: 2,
                leadingBufferZone: 2,
                viewConfig: {deferEmptyText: false, emptyText: "Sin resultados."}
            }];
    },
    selectRecords: function (c) {
        var d = this.lookupReference("searchGrid");
        return d.getSelectionModel().select(c);
    },
    deselectRecords: function (c) {
        var d = this.lookupReference("searchGrid");
        return d.getSelectionModel().deselect(c);
    },
    search: function (g) {
        var h = this, f = h.searchFilter, e = h.getSearchStore().getFilters();
        if (g) {
            e.beginUpdate();
            if (f) {
                f.setValue(g);
            } else {
                h.searchFilter = f = new Ext.util.Filter({id: "search", property: h.field, value: g});
            }
            e.add(f);
            e.endUpdate();
        } else {
            if (f) {
                e.remove(f);
            }
        }
    },
    privates: {
        onClearSearch: function () {
            var b = this.lookupReference("searchField");
            b.setValue(null);
            b.focus();
        }, onSearchChange: function (f) {
            var d = f.getValue(), e = f.getTrigger("clear");
            e.setHidden(!d);
            this.search(d);
        }, onSelectionChange: function (o, n) {
            var t = this.owner, m = t.getStore(), r = m.data, q = 0, v = {}, i, s, u, p;
            for (s = n.length; s--; ) {
                p = n[s];
                u = p.id;
                v[u] = p;
                if (!r.containsKey(u)) {
                    (i || (i = [])).push(t.convertSearchRecord(p));
                }
            }
            for (s = r.length; s--; ) {
                p = r.getAt(s);
                if (!v[p.id]) {
                    (q || (q = [])).push(p);
                }
            }
            if (i || q) {
                r.splice(r.length, q, i);
            }
        }
    }
});