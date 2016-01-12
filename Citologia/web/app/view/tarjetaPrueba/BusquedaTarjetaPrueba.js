Ext.define('Citologia.view.tarjetaPrueba.BusquedaTarjetaPrueba', {
    extend: 'Ext.form.Panel',
    title: '<i class="fa fa-search-plus"></i>Buscar Pruebas Realizadas',
    alias: 'widget.busquedaTarjetaPrueba',
    collapsible: true,
    bodyPadding: 5,
    minWidth: '100%',
    collapsed: true,
    frame: true,
    titleCollapse: true,
    layout: {type: 'hbox', defaultMargins: {right: 10}, align: 'stretchmax', stretchMaxPartner: 'gridPaciente'},
    initComponent: function () {
        this.items = [{
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    labelWidth: 120,
                    width: '100%'
                },
                items: [{
                        xtype: 'fieldset',
                        title: 'Primera Citologia',
                        layout: {
                            type: 'anchor'
                        },
                        defaults: {
                            width: 250,
                            labelAlign: 'top',
                            anchor: '100%'
                        },
                        anchor: '100%',
                        items: [{
                                xtype: 'fieldset',
                                title: 'Rango de Fechas de Toma',
                                height: 80,
                                layout: {
                                    type: 'hbox',
                                    stretch: 'stretchmax',
                                    defaultMargins: {right: 5}
                                },
                                defaults: {
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'joinJprimeraCitologia.rangoIfechaTomaMuestra',
                                        fieldLabel: 'Fecha Inicio',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        format: 'd/m/Y',
                                        flex: 1,
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaInicio',
                                        fechaFinal: 'fechaFinal'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'rangoFfechaTomaMuestra',
                                        fieldLabel: 'Fecha Final',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        flex: 1,
                                        format: 'd/m/Y',
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaFinal',
                                        fechaInicio: 'fechaInicio'
                                    }]
                            }, {
                                xtype: 'fieldset',
                                title: 'Rango de Fechas de los Resultados',
                                height: 80,
                                layout: {
                                    type: 'hbox',
                                    stretch: 'stretchmax',
                                    defaultMargins: {right: 5}
                                },
                                defaults: {
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'joinJprimeraCitologia.rangoIfechaResultadoFinal',
                                        fieldLabel: 'Fecha Inicio',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        format: 'd/m/Y',
                                        flex: 1,
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaInicioRF',
                                        fechaFinal: 'fechaFinalRF'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'rangoFfechaResultadoFinal',
                                        fieldLabel: 'Fecha Final',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        flex: 1,
                                        format: 'd/m/Y',
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaFinalRF',
                                        fechaInicio: 'fechaInicioRF'
                                    }]
                            }, {
                                xtype: 'combo',
                                store: 'DiagnosticosFinales',
                                name: 'primeraCitologia.diagnosticoFinal.idDiagnosticoFinal',
                                fieldLabel: 'Diagnostico Final',
                                displayField: 'diagnosticoFinal',
                                labelAlign: 'top',
                                width: 250,
                                valueField: 'idDiagnosticoFinal',
                                queryMode: 'local',
                                emptyText: 'Seleccione diagnosticos finales'

                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Otro Datos',
                        layout: {
                            type: 'anchor'
                        },
                        defaults: {
                            labelAlign: 'top',
                            anchor: '100%'
                        },
                        items: [{
                                xtype: 'combo',
                                width: 250,
                                store: 'TiposCasos',
                                name: 'tipoCaso',
                                fieldLabel: 'Tipo de Caso',
                                displayField: 'tipoCaso',
                                valueField: 'objeto',
                                queryMode: 'local',
                                emptyText: 'Seleccione Tipo de Caso'
                            }, {
                                xtype: 'combo',
                                width: 250,
                                store: 'ResponsablesMuestra',
                                name: 'responsablesMuestras',
                                fieldLabel: 'Responsables Toma de Muestra',
                                displayField: 'nombre',
                                valueField: 'objeto',
                                multiSelect: true,
                                queryMode: 'local',
                                emptyText: 'Seleccione Responsables Toma de Muestra',
                                displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}</tpl>'),
                                tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
                            }]
                    }]
            }, {
                xtype: 'fieldset',
                title: 'Antecedentes',
                layout: {
                    type: 'hbox'
                },
                flex: 2,
                items: [{
                        xtype: 'container',
                        flex: 0.5,
                        defaults: {
                            labelWidth: 120,
                            width: '100%'
                        },
                        layout: {
                            type: 'anchor',
                            anchor: '100%'
                        },
                        items: [{
                                xtype: 'fieldcontainer',
                                defaults: {
                                    width: 150,
                                    labelAlign: 'top'
                                },
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {right: 3}
                                },
                                items: [{
                                        xtype: 'checkbox',
                                        submitValue: false,
                                        action: 'cambiarEstado',
                                        width: 15,
                                        style: {
                                            marginTop: '23px'
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'antecedente.edadPrimeraRelacionSexual',
                                        fieldLabel: 'Primera Relacion Sexual',
                                        emptyText: 'Inserte edad de la primera relacion sexual',
                                        disabled: true
                                    }]
                            }, {
                                xtype: 'fieldcontainer',
                                defaults: {
                                    width: 150,
                                    labelAlign: 'top'
                                },
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {right: 3}
                                },
                                items: [{
                                        xtype: 'checkbox',
                                        submitValue: false,
                                        action: 'cambiarEstado',
                                        width: 15,
                                        style: {
                                            marginTop: '23px'
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'antecedente.edadPrimerEmbarazo',
                                        fieldLabel: 'Edad Primer Embarazo',
                                        emptyText: 'Inserte edad del primer embarazo',
                                        disabled: true
                                    }]
                            }, {
                                xtype: 'fieldcontainer',
                                defaults: {
                                    width: 150,
                                    labelAlign: 'top'
                                },
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {right: 3}
                                },
                                items: [{
                                        xtype: 'checkbox',
                                        submitValue: false,
                                        action: 'cambiarEstado',
                                        width: 15,
                                        style: {
                                            marginTop: '23px'
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'antecedente.numeroPartos',
                                        fieldLabel: 'N\u00famero de Partos',
                                        emptyText: 'Inserte N\u00famero de Partos',
                                        disabled: true
                                    }]
                            }, {
                                xtype: 'fieldcontainer',
                                defaults: {
                                    width: 150,
                                    labelAlign: 'top'
                                },
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {right: 3}
                                },
                                items: [{
                                        xtype: 'checkbox',
                                        submitValue: false,
                                        action: 'cambiarEstado',
                                        width: 15,
                                        style: {
                                            marginTop: '23px'
                                        }
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'antecedente.yearMenopausia',
                                        fieldLabel: 'A\u00f1o de Menopausia',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        disabled: true
                                    }]
                            }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        defaults: {
                            labelWidth: 150,
                            width: '100%',
                            margin: '23 0 15 0'
                        },
                        layout: {
                            type: 'anchor',
                            anchor: '100%'
                        },
                        items: [{
                                xtype: 'fieldset',
                                title: 'Rango de Fechas de \u00daltima Mestruaci\u00f3n',
                                height: 80,
                                layout: {
                                    type: 'hbox',
                                    stretch: 'stretchmax',
                                    defaultMargins: {right: 5}
                                },
                                defaults: {
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'joinJantecedentes.rangoIultimaMestruacion',
                                        fieldLabel: 'Fecha Inicio',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        format: 'd/m/Y',
                                        flex: 1,
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaInicioUM',
                                        fechaFinal: 'fechaFinalUM'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'rangoFultimaMestruacion',
                                        fieldLabel: 'Fecha Final',
                                        emptyText: 'Inserte A\u00f1o de Menopausia',
                                        maxValue: new Date(),
                                        flex: 1,
                                        format: 'd/m/Y',
                                        vtype: 'rangoFecha',
                                        itemId: 'fechaFinalUM',
                                        fechaInicio: 'fechaInicioUM'
                                    }]
                            }, {
                                xtype: 'combo',
                                store: {
                                    fields: ['idMetrorragia', 'metrorragia'],
                                    data: [
                                        {idMetrorragia: 1, metrorragia: 'Continua'},
                                        {idMetrorragia: 2, metrorragia: 'Al Coito'},
                                        {idMetrorragia: 3, metrorragia: 'Intermestrual'}
                                    ]
                                },
                                name: 'metrorragia.idMetrorragia',
                                fieldLabel: 'Metrorragia',
                                displayField: 'metrorragia',
                                valueField: 'idMetrorragia',
                                margin: '26 0 0 0',
                                anchor: '100%',
                                queryMode: 'local',
                                emptyText: 'Seleccione Metrorragia'
                            }, {
                                xtype: 'combo',
                                store: 'TiposAnticonceptivos',
                                name: 'antecedente.tipoAnticonceptivo.idTipoAnticonceptivo',
                                margin: '26 0 0 0',
                                fieldLabel: 'Tipo Anticonceptivo',
                                displayField: 'nombreAnticonceptivo',
                                valueField: 'idTipoAnticonceptivo',
                                queryMode: 'local',
                                anchor: '100%',
                                emptyText: 'Seleccione Tipo Anticonceptivo',
                                displayTpl: new Ext.XTemplate('<tpl for=".">{nombreAnticonceptivo} <tpl if="oral">(Oral)</tpl> </tpl>'),
                                tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombreAnticonceptivo} <tpl if="oral">(Oral)</tpl></div></tpl>')
                            }, {
                                xtype: 'combo',
                                store: 'EnfermedadesTransmisionSexual',
                                name: 'joinJenfermedadesTransmisionSexual.idEnfermedadTransmisionSexual',
                                fieldLabel: 'Enfermedades Transmision',
                                margin: '26 0 0 0',
                                displayField: 'enfermedad',
                                valueField: 'idEnfermedadTransmisionSexual',
                                queryMode: 'local',
                                anchor: '100%',
                                emptyText: 'Seleccione Enfermedad',
                                multiSelect: true
                            }, {
                                xtype: 'textfield',
                                anchor: '100%',
                                margin: '26 0 0 0',
                                name: 'likeLotros',
                                fieldLabel: 'Otros Tratamientos',
                                emptyText: 'Inserte Otros Tratamientos'
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Buscar',
                scale: 'medium',
                iconCls: 'buscar',
                action: 'buscar'
            }, {
                scope: this,
                text: 'Limpiar',
                scale: 'medium',
                iconCls: 'limpiar',
                handler: function (bot) {
                    bot.up('form').getForm().reset();
                }
            }];
        this.callParent(arguments);
    },
    listeners: {
        collapse: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 450}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 450}});
        }
    }
});