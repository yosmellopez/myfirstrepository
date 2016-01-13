Ext.define('Seleccion.plugins.SubTable', {
    extend: 'Ext.grid.plugin.RowExpander',
    alias: 'plugin.subtable',
//    rowBodyTpl: ['<table class="' + Ext.baseCSSPrefix + 'grid-subtable"><tbody>',
//        '{%',
//        'this.owner.renderTable(out, values);',
//        '%}',
//        '</tbody></table>'
//    ],
    forceFit: true,
    title: '',
    rowBodyTpl: new Ext.XTemplate('<fieldset class="x-component x-fieldset-header-text x-component-default">{% this.owner.getTitle(out,values) %}<table class="' + Ext.baseCSSPrefix + 'grid-subtable" style="{[ this.owner.forceFit? "width:100%":"" ]}"><tbody>', "{% this.owner.renderTable(out,values);%}", "</tbody></table></fieldset>"),
    init: function (grid) {
        var me = this,
                columns = me.columns,
                len, i, columnCfg;

        me.callParent(arguments);

        me.columns = [];
        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                // Don't register with the component manager, we create them to use
                // their rendering smarts, but don't want to treat them as real components
                columnCfg = Ext.apply({
                    preventRegister: true
                }, columns[i]);
                columnCfg.xtype = columnCfg.xtype || 'gridcolumn';
                me.columns.push(Ext.widget(columnCfg));
            }
        }
    },
    destroy: function () {
        var columns = this.columns,
                len, i;

        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                columns[i].destroy();
            }
        }
        this.columns = null;
        this.callParent();
    },
    getRowBodyFeatureData: function (record, idx, rowValues) {
        this.callParent(arguments);
        rowValues.rowBodyCls += ' ' + Ext.baseCSSPrefix + 'grid-subtable-row';
    },
    renderTable: function (out, rowValues) {
        var me = this,
                columns = me.columns,
                numColumns = columns.length,
                associatedRecords = me.getAssociatedRecords(rowValues.record),
                recCount = associatedRecords.length,
                rec, column, i, j, value;

        out.push('<thead>');
        for (j = 0; j < numColumns; j++) {
            out.push('<th class="' + Ext.baseCSSPrefix + 'grid-subtable-header">', columns[j].text, '</th>');
        }
        out.push('</thead>');
        total = me.calcularTotal(columns);
        for (i = 0; i < recCount; i++) {
            rec = associatedRecords[i];
            out.push('<tr>');
            for (j = 0; j < numColumns; j++) {
                column = columns[j];
                value = rec.get(column.dataIndex);
                if (column.renderer && column.renderer.call) {
                    value = me.renderer.call(me, column, value, {}, rec, i, j);
                }
                out.push('<td class="' + Ext.baseCSSPrefix + 'grid-subtable-cell"');
                if (column.width !== null && column.width !== undefined) {
                    out.push(' style="width:' + column.width + 'px"');
                } else {
                    if (column.flex !== null && column.flex !== undefined) {
                        out.push(' style="width:' + (column.flex * 100 / total) + '%"');
                    }
                }
                out.push('><div class="' + Ext.baseCSSPrefix + 'grid-cell-inner">', value, '</div></td>');
            }
            out.push('</tr>');
        }
    },
    getRowBodyContentsFn: function (rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues);
        };
    },
    getAssociatedRecords: function (record) {
        return record[this.association]().getRange();
    },
    renderer: function (column, value, metaData, record, rowIndex, colIndex, store, view) {
        switch (column.xtype) {
            case 'booleancolumn':
                return value === 'false' ? column.falseText : column.trueText;
            case 'templatecolumn':
                return column.tpl.applyTemplate(record.data);
            case 'rownumberer':
                return rowIndex + 1;
            case 'datecolumn':
                return Ext.util.Format.date(value, column.format);
            case 'gridcolumn':
                return column.renderer(value, metaData, record, rowIndex, colIndex, store, view);
        }
        return value;
    },
    calcularTotal: function (columns) {
        total = 0;
        for (i = 0; i < columns.length; i++) {
            total += columns[i].flex;
        }
        return total;
    },
    getTitle: function (a) {
        a.push("<legend>" + this.title + "</legend>");
        return this.title;
    }
});