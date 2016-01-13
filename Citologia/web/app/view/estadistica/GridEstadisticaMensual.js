Ext.define('Citologia.view.estadistica.GridEstadisticaMensual', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'EstadisticasMensuales',
    alias: 'widget.gridEstadisticaMensual',
    forceFit: true,
    title: 'Estad\u00edstica Mensual',
    features: [{
            ftype: 'summary'
        }],
    dockedItems: [{
            xtype: 'form',
            bodyPadding: 5,
            dock: 'top',
            layout: {
                type: 'hbox',
                defaultMargins: {right: 5}
            },
            items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Mes',
                    labelWidth: 60,
                    width: 300,
                    name: 'fecha',
                    format: 'F/Y',
                    value: new Date(),
                    editable: false,
                    allowBlank: false,
                    style: {
                        marginTop: '5px'
                    }
                }, {
                    xtype: 'button',
                    text: 'Ver Reporte del Mes',
                    scale: 'medium',
                    buttonAlign: 'center',
                    formBind: true,
                    handler: function (bot) {
                        grid = this.up('grid');
                        form = grid.down('form');
                        store = grid.getStore();
                        store.load({params: form.getValues()});
                    }
                }]
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'EstadisticasMensuales',
            beforePageText: 'P\u00e1gina',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true,
            pageSize: 22,
            refreshText: 'Actualizando',
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: '\u00c1rea',
                dataIndex: 'area',
                flex: 1,
                summaryRenderer: function () {
                    return 'Total: ';
                }
            }, {
                header: 'No \u00datil',
                dataIndex: 'noUtil',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'Negativo C\u00e9lulas Malignas',
                dataIndex: 'negativo',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'Positivo C\u00e9lulas Malignas',
                dataIndex: 'infectadas',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'Total',
                dataIndex: 'total',
                flex: 1,
                summaryType: 'sum'
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'mensaje',
            store: this.getStore()
        });
    }
});