Ext.define('Citologia.view.sala.GridSala', {
    extend: 'Ext.grid.Panel',
    title: 'Listado de salas',
    alias: 'widget.aliasgridsalas',
    store: 'Salas',
    forceFit: true,
    selType: 'checkboxmodel',
    height: 530,
    enableLocking: true,
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'button',
                    text: 'Insertar Sala',
                    iconCls: 'fa fa-plus fa-1x',
                    scale: 'medium',
                    action: 'add'
                }, {
                    text: 'Eliminar',
                    scale: 'medium',
                    iconCls: 'fa fa-trash-o fa-1x',
                    action: 'delete'
                }]
        }, {
            xtype: 'busquedassala'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Nombre',
                dataIndex: 'nombreSala',
                flex: 1
            }, {
                header: 'Cama Física',
                dataIndex: 'camaReal',
                flex: 1
            }];
        this.bbar = [{
                xtype: 'pagingtoolbar',
                store: 'Salas',
                beforePageText: 'Página',
                afterPageText: 'de {0}',
                displayMsg: 'Mostrando {0} - {1} de {2}',
                emptyMsg: 'No hay datos que mostrar', dock: 'bottom',
                displayInfo: true,
                width: '100%'
            }];
        this.callParent(arguments);
    }
});