Ext.define('Seleccion.view.centroTrabajo.GridCentroTrabajo', {
    extend: 'Ext.grid.Panel',
    height: 500,
    title: 'Lista de Centros de Trabajos',
    store: 'CentrosTrabajos',
    alias: 'widget.gridCentroTrabajo',
    selType: 'checkboxmodel',
    forceFit: true,
    iconCls: 'fa fa-shopping-cart',
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Centro Trabajo',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-shopping-cart'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'CentrosTrabajos',
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
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Centros de Trabajos...',
            store: this.getStore()
        });
    }
});

