Ext.define('Seleccion.view.controlAspirante.GridControlAspirante', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'ControlAspirantes',
    alias: 'widget.gridControlAspirante',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Control de Aspirante',
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
            store: 'ControlAspirantes',
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
                header: 'Estado del Expediente',
                dataIndex: 'expProceso',
                width: 70,
                xtype: 'booleancolumn',
                trueText: 'Expediente en Proceso',
                falseText: 'Expediente Culminado'
            }, {
                header: 'Aspirante',
                dataIndex: 'aspirante',
                width: 90,
                renderer: function (obj) {
                    return obj.nombre + ' ' + obj.apellidos;
                }
            }, {
                header: 'Aprobado por MININT',
                dataIndex: 'aprobadoMinint',
                width: 60,
                xtype: 'booleancolumn',
                trueText: 'Aprobado MININT',
                falseText: 'Denegado MININT'
            }, {
                header: 'Observaciones',
                columns: [{
                        header: 'Fecha de Presentaci\u00f3n',
                        dataIndex: 'observacion',
                        width: 160,
                        renderer: function (v) {
                            return v.fechaPresentacion;
                        }
                    }, {
                        header: 'Fecha de Baja',
                        dataIndex: 'observacion',
                        width: 120,
                        renderer: function (obj) {
                            return obj.fechaBaja;
                        }
                    }, {
                        header: 'Motivo Baja',
                        width: 200,
                        dataIndex: 'observacion',
                        renderer: function (obj) {
                            return obj.motivoBaja;
                        }
                    }]
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Control del Aspirante...',
            store: this.getStore()
        });
    }
});

