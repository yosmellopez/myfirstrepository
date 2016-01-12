Ext.define('Citologia.view.ingreso.GridIngresoReportes', {
    extend: 'Ext.grid.Panel',
    title: 'Listado de ingreso',
    alias: 'widget.gridingresosreportes',
    store: 'Ingresos',
    id: 'ing',
    forceFit: true,
    selType: 'checkboxmodel',
    height: 750,
    features: [{
            ftype: 'grouping',
            groupHeaderTpl: 'Paciente Ingresado: {name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
    enableLocking: false,
    viewConfig: {
        stripeRows: true
    },
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                    '<div style="padding-left:70px;"><p><b>Estado Paciente: </b>{estadoPaciente.estadoPaciente}</p>',
                    '<p><b>Tipo Ingreso: </b>{tipoIngreso.tipoIngreso}</p>',
                    '<p><b>Diagnóstico Probable: </b>{diagnosticoProbable}</p></div>')
        }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'label',
                    text: 'Generar Reportes a:'
                }, {
                    xtype: 'button',
                    text: 'Pdf',
                    scale: 'medium',
                    action: 'reporte',
                    id: 'pdf',
                    iconCls: 'pdf'
                }, {
                    xtype: 'button',
                    text: 'Excel',
                    scale: 'medium',
                    action: 'reporte',
                    id: 'xls',
                    iconCls: 'excel'
                }]
        }, {
            xtype: 'busquedasingresos'
        }],
    initComponent: function() {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Paciente',
                dataIndex: 'paciente',
                renderer: function(obj) {
                    return obj.nombre + " " + obj.primerApellido;
                },
                width: 110
            }, {
                header: 'FS',
                dataIndex: 'fueraServicio',
                width: 20,
                renderer: function(obj) {
                    return obj ? "Si" : "No";
                }
            }, {
                xtype: 'templatecolumn',
                header: 'Servicio Pertenece',
                width: 90,
                tpl: Ext.create('Ext.XTemplate', '<tpl if="servicioFuera!==null">{servicioFuera.servicio.denominacionServicio}<tpl else>{sala.servicio.denominacionServicio}</tpl>')
            }, {
                header: 'Servicio Está',
                dataIndex: 'sala',
                width: 90,
                renderer: function(obj) {
                    return obj.servicio.denominacionServicio;
                }
            }, {
                header: 'Sala',
                dataIndex: 'sala',
                width: 90,
                renderer: function(obj) {
                    return obj.nombreSala;
                }
            }, {
                header: 'Especialidad',
                dataIndex: 'especialidad',
                renderer: function(obj) {
                    return obj.denominacionEspecialidad;
                },
                width: 80
            }, {
                header: 'Cama',
                dataIndex: 'cama',
                renderer: function(obj) {
                    return obj.numeroCama;
                },
                width: 35
            }, {
                header: 'F. Ingreso',
                dataIndex: 'fecha',
                width: 60,
                editor: {
                    xtype: 'datefield',
                    allowBlank: false
                }
            }
        ];
        this.bbar = [
            {
                xtype: 'pagingtoolbar',
                store: 'Ingresos',
                beforePageText: 'Página',
                afterPageText: 'de {0}',
                displayMsg: 'Mostrando {0} - {1} de {2}',
                emptyMsg: 'No hay datos que mostrar',
                dock: 'bottom',
                displayInfo: true,
                width: '100%'
            }];
        this.callParent(arguments);
    }
});