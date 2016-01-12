Ext.define('Citologia.view.tarjetaPrueba.GridTarjetaPruebaReporte', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'TarjetasPruebas',
    alias: 'widget.gridTarjetaPruebaReporte',
    title: 'Reporte de Pruebas Realizadas',
    selType: 'checkboxmodel',
    forceFit: true,
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate('<p class="p"><b>Diagnostico Final:</b>{primeraCitologia.diagnosticoFinal.diagnosticoFinal}</p>')
        }],
    features: [{
            ftype: 'grouping',
            groupHeaderTpl: 'Nombre Paciente: {name}'
        }],
    dockedItems: [{
            xtype: 'toolbar',
            items: [{
                    xtype: 'button',
                    text: 'Exportar a PDF',
                    scale: 'medium',
                    iconCls: 'fa fa-file-pdf-o fa-1x',
                    accion: 'pdf',
                    scope: this,
                    handler: this.exportar
                }, {
                    xtype: 'button',
                    text: 'Exportar a Word',
                    scale: 'medium',
                    iconCls: 'fa fa-file-word-o fa-1x',
                    accion: 'docx',
                    scope: this,
                    handler: this.exportar
                }, {
                    xtype: 'button',
                    text: 'Exportar a Excel',
                    scale: 'medium',
                    iconCls: 'fa fa-file-excel-o fa-1x',
                    accion: 'xlsx',
                    scope: this,
                    handler: this.exportar
                }]
        }, {
            xtype: 'busquedaTarjetaPrueba'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'TarjetasPruebas',
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
                header: 'Paciente',
                columns: [{
                        header: 'Historia Cl\u00ednica',
                        dataIndex: 'paciente',
                        width: 110,
                        renderer: function (obj) {
                            return obj.historiaClinica;
                        }
                    }, {
                        header: 'Edad',
                        dataIndex: 'paciente',
                        width: 60,
                        renderer: function (obj) {
                            return obj.edad;
                        }
                    }]
            }, {
                header: 'Fechas Primera Citolog\u00eda',
                columns: [{
                        header: 'Toma Muestra',
                        dataIndex: 'primeraCitologia',
                        align: 'center',
                        width: 105,
                        renderer: function (pc) {
                            return pc.fechaTomaMuestra;
                        }
                    }, {
                        header: 'Resultado Final',
                        dataIndex: 'primeraCitologia',
                        align: 'center',
                        width: 120,
                        renderer: function (pc) {
                            return pc.fechaResultadoFinal;
                        }
                    }]
            }, {
                header: 'Antecedentes',
                columns: [{
                        header: '1era Relaci\u00f3n',
                        dataIndex: 'antecedente',
                        align: 'center',
                        width: 100,
                        renderer: function (ante) {
                            return ante.edadPrimeraRelacionSexual;
                        }
                    }, {
                        header: '1er Embarazo',
                        dataIndex: 'antecedente',
                        align: 'center',
                        width: 100,
                        renderer: function (ante) {
                            return ante.edadPrimerEmbarazo;
                        }
                    }, {
                        header: 'No. Partos',
                        dataIndex: 'antecedente',
                        align: 'center',
                        width: 85,
                        renderer: function (ante) {
                            return ante.numeroPartos;
                        }
                    }, {
                        header: 'Metrorragia',
                        dataIndex: 'antecedente',
                        width: 90,
                        renderer: function (ante) {
                            return ante.metrorragia.metrorragia;
                        }
                    }, {
                        header: 'Anticonceptivo',
                        dataIndex: 'antecedente',
                        width: 110,
                        renderer: function (ante) {
                            return ante.tipoAnticonceptivo.nombreAnticonceptivo;
                        }
                    }, {
                        header: 'Tipo Caso',
                        dataIndex: 'tipoCaso',
                        width: 90,
                        renderer: function (tipo) {
                            return tipo.tipoCaso;
                        }
                    }]
            }];
        this.callParent(arguments);
    }
});
function exportar(bot) {
    window.open('/Citologia/' + bot.accion + '/tarjetaPrueba/tarjetaPrueba', '_new');
}