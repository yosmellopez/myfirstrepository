Ext.define('Seleccion.view.resumenExpediente.GridResumenExp', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'ResumenExpedientes',
    alias: 'widget.gridResumenExp',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Resumen Expediente',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus-circle fa-2x'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }, {
            xtype: 'button',
            text: 'Ver Reporte',
            scale: 'medium',
            iconCls: 'x-fa fa-trash',
            menu: [{
                    text: 'PDF',
                    formato: 'pdf',
                    action: 'generar'
                }, {
                    text: 'Word',
                    formato: 'docx',
                    action: 'generar'
                }, {
                    text: 'Excel',
                    formato: 'xlsx',
                    action: 'generar'
                }]
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'ResumenExpedientes',
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
                header: 'Fecha',
                dataIndex: 'fecha',
                flex: 1
            }, {
                header: 'Apodo',
                dataIndex: 'apodo',
                flex: 1
            }, {
                header: 'Conclusiones',
                dataIndex: 'conclusiones',
                flex: 1
            }, {
                header: 'Elaborador',
                dataIndex: 'elaborador',
                flex: 1
            }, {
                header: 'Fecha de Elaborado',
                dataIndex: 'fechaElaborado',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Resumen de Expediente',
            store: this.getStore()
        });
    }
});

