Ext.define("Registro.plugins.SubTable", {
    extend: "Ext.grid.plugin.RowExpander",
    alias: "plugin.subtable",
    forceFit: true,
    pluginId: 'myPlugin',
    constructor: function (config) {
        if (config) {
            this.pluginConfig = config;
            Ext.apply(this, config);
        }
        var me = this;
        this.rowBodyTpl = new Ext.XTemplate('<fieldset class="x-component x-fieldset-header-text x-component-default">{% this.me.getTitle(out,values) %}<table class="' + Ext.baseCSSPrefix + 'grid-subtable" style="width:100%"><tbody>', "{% this.me.renderTable(out,values);%}", "</tbody></table></fieldset>", {
            me: me
        });
        this.callParent(config);
    },
    width: 40,
    title: "",
    init: function (d) {
        var e = this, c = e.columns, a, b, f;
        e.callParent(arguments);
        e.columns = [];
        if (c) {
            for (b = 0, a = c.length; b < a; ++b) {
                f = Ext.apply({preventRegister: true}, c[b]);
                f.xtype = f.xtype || "gridcolumn";
                e.columns.push(Ext.widget(f));
            }
        }
    },
    destroy: function () {
        var c = this.columns, a, b;
        if (c) {
            for (b = 0, a = c.length; b < a; ++b) {
                c[b].destroy();
            }
        }
        this.columns = null;
        this.callParent();
    },
    getRowBodyFeatureData: function (b, a, c) {
        this.callParent(arguments);
        c.rowBodyCls += " " + Ext.baseCSSPrefix + "grid-subtable-row";
    },
    renderTable: function (g, n) {
        grid = this.getCmp();
        st = grid.getStore();
        Model = st.model;
        m = new Model();
        record = st.getById(n[m.idProperty]);
        var l = this, d = l.columns, a = d.length, c = l.getAssociatedRecords(record), o = c.length, e, b, h, f, m, k;
        k = l.calcularTotal(d);
        g.push("<thead>");
        for (f = 0; f < a; f++) {
            g.push('<th class="' + Ext.baseCSSPrefix + 'grid-subtable-header">', d[f].text, "</th>");
        }
        g.push("</thead>");
        for (h = 0; h < o; h++) {
            e = c[h];
            g.push("<tr>");
            for (f = 0; f < a; f++) {
                b = d[f];
                m = e.get(b.dataIndex);
                g.push('<td class="' + Ext.baseCSSPrefix + 'grid-subtable-cell"');
                if (b.width !== null && b.width !== undefined) {
                    g.push(' style="width:' + b.width + 'px"');
                } else {
                    if (b.flex !== null && b.flex !== undefined) {
                        g.push(' style="width:' + (b.flex * 100 / k) + '%"');
                    }
                }
                g.push('><div class="' + Ext.baseCSSPrefix + 'grid-cell-inner">', m, "</div></td>");
            }
            g.push("</tr>");
        }
    },
    getRowBodyContentsFn: function (a) {
        var b = this;
        return function (c) {
            a.owner = b;
            return a.applyTemplate(c);
        };
    },
    getAssociatedRecords: function (a) {
        return a[this.association + 'Store'].getRange();
    },
    updatePlugin: function () {
        this.updateLayout();
    },
    calcularTotal: function (a) {
        total = 0;
        for (i = 0; i < a.length; i++) {
            total += a[i].flex;
        }
        return total;
    },
    getTitle: function (a) {
        a.push("<legend>" + this.title + "</legend>");
        return this.title;
    }
});