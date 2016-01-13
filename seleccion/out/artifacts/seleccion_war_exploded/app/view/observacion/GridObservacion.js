Ext.define('Seleccion.view.bservacion.GridObservacion', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Observaciones',
    alias: 'widget.gridObservacion',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Observacion',
            scale: 'medium',
            action: 'nuevo'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Observaciones',
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
                header: 'Fecha de Presentacion',
                dataIndex: 'fechaPresentacion',
                flex: 1
            },
         {
                header: 'Fecha de Baja',
                dataIndex: 'fechaBaja',
                flex: 1
            },
        {
                header: 'Motivo de Baja',
                dataIndex: 'motivoBaja',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Observacion...',
            store: this.getStore()
        });
    }
});

