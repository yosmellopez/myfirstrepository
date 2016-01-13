Ext.define('Seleccion.view.integRev.GridIntegRev', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'IntegracionesRevolucionarias',
    alias: 'widget.gridIntegRev',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Integraci\u00f3n Revolucionaria',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus-circle fa-2x'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-2x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'IntegracionesRevolucionarias',
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
                header: 'Integracion Revolucionaria',
                dataIndex: 'integracionRevolucionaria',
                flex: 1
            }, {
                header: 'Siglas',
                dataIndex: 'siglas',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Integracion Revolucionaria...',
            store: this.getStore()
        });
    }
});

