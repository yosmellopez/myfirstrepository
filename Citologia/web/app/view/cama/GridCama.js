Ext.define('Citologia.view.cama.GridCama', {
    extend: 'Ext.grid.Panel',
    title: 'Listado de camas',
    alias: 'widget.aliasgridcamas',
    store: 'Camas',
    forceFit: true,
    selType: 'checkboxmodel',
    viewConfig: {
        stripeRows: true
    },
    height: 530,
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'button',
                    text: 'Insertar Cama',
                    iconCls: 'fa fa-plus fa-1x',
                    scale: 'medium',
                    action: 'add'
                }, {
                    text: 'Eliminar',
                    iconCls: 'fa fa-trash-o fa-1x',
                    scale: 'medium',
                    action: 'delete'
                }]
        }, {
            xtype: 'busquedascamas'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Camas',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            emptyMsg: 'No hay datos que mostrar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Numero de cama',
                dataIndex: 'numeroCama',
                width: 80
            }, {
                header: 'Estado cama',
                dataIndex: 'habilitada',
                width: 80,
                renderer: function (obj) {
                    return obj ? "Ocupada" : "Desocupada";
                }
            }, {
                header: 'Sala',
                dataIndex: 'sala',
                renderer: function (obj) {
                    return obj.nombreSala;
                },
                width: 80
            }
        ];
        this.callParent(arguments);
    }
});