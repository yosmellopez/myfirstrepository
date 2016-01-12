Ext.define('Citologia.view.municipio.GridMunicipio', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Municipios',
    alias: 'widget.gridMunicipio',
    title: 'Lista de Municipios',
    selType: 'checkboxmodel',
    iconCls: 'lista',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Municipio',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Municipio',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Municipios',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Municipios',
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
                header: 'Nombre de Municipio',
                dataIndex: 'municipio',
                flex: 1
            }, {
                header: 'Nombre de Provincia',
                dataIndex: 'provincia',
                flex: 1,
                renderer: function (obj) {
                    return obj.provincia;
                }
            }];
        this.callParent(arguments);
    }
});