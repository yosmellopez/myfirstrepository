Ext.define('Citologia.view.provincia.GridProvincia', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Provincias',
    alias: 'widget.gridProvincia',
    title: 'Lista de Provincias',
    selType: 'checkboxmodel',
    iconCls: 'lista',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nueva Provincia',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Provincia',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Provincias',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Provincias',
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
                header: 'Nombre de Provincia',
                dataIndex: 'provincia',
                flex: 1
            }];
        this.callParent(arguments);
    }
});