Ext.define('Seleccion.view.residencia.GridResidencia', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Residencias',
    alias: 'widget.gridResidencia',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Residencia',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus-circle fa-2x'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Residencias',
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
                header: 'No',
                xtype: 'rownumberer'
            }, {
                header: 'Desde',
                dataIndex: 'desde',
                flex: 1
            }, {
                header: 'Hasta',
                dataIndex: 'hasta',
                flex: 1
            }, {
                header: 'Direccion',
                dataIndex: 'direccion',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Residencia...',
            store: this.getStore()
        });
    }
});