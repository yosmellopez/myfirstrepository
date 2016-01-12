Ext.define('Citologia.view.tarjetaPrueba.ModificarTarjetaPrueba', {
    extend: 'Ext.window.Window',
    alias: 'widget.modificarTarjetaPrueba',
    title: 'Modificar Datos Tarjeta de Prueba',
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                layout: {
                    type: 'hbox',
                    defaultMargins: {right: 5}
                },
                items: [{
                        xtype: 'container',
                        items: [{
                                xtype: 'fieldset',
                                title: 'Paciente',
                                defaults: {
                                    allowBlank: false,
                                    width: 250,
                                    labelAlign: 'top',
                                    readOnly: true
                                },
                                items: [{
                                        xtype: 'textfield',
                                        name: 'nombre',
                                        fieldLabel: 'Nombre',
                                        emptyText: 'Inserte nombre'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'primerApellido',
                                        fieldLabel: 'Apellidos',
                                        emptyText: 'Inserte Primer Apellido'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'historiaClinica',
                                        fieldLabel: 'Historia Cl\u00ednica',
                                        emptyText: 'Introduzca Historia Cl\u00ednica'
                                    }]
                            }, {
                                xtype: 'fieldset',
                                title: 'Primera Citologia',
                                defaults: {
                                    allowBlank: false,
                                    width: 250,
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'fechaTomaMuestra',
                                        fieldLabel: 'Fecha Toma Muestra',
                                        emptyText: 'Seleccione A\u00f1o de Menopausia'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechaResultadoFinal',
                                        fieldLabel: 'Fecha Resultado Final',
                                        emptyText: 'Seleccione A\u00f1o de Menopausia'
                                    }, {
                                        xtype: 'combo',
                                        store: 'DiagnosticosFinales',
                                        name: 'diagnosticoFinal',
                                        fieldLabel: 'Diagnostico Final',
                                        displayField: 'diagnosticoFinal',
                                        labelAlign: 'top',
                                        width: 250,
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione diagnosticos finales'

                                    }]
                            }, {
                                xtype: 'fieldset',
                                title: 'Otro Datos',
                                items: [{
                                        xtype: 'combo',
                                        width: 250,
                                        labelAlign: 'top',
                                        store: 'TiposCasos',
                                        name: 'tipoCaso',
                                        fieldLabel: 'Tipo de Caso',
                                        displayField: 'tipoCaso',
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        editable: false,
                                        queryMode: 'local',
                                        autoSelect: false,
                                        emptyText: 'Seleccione Tipo de Caso'
                                    }, {
                                        xtype: 'combo',
                                        width: 250,
                                        labelAlign: 'top',
                                        store: 'ResponsablesMuestra',
                                        name: 'responsablesMuestras',
                                        fieldLabel: 'Responsables Toma de Muestra',
                                        displayField: 'nombre',
                                        multiSelect: true,
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione Responsables Toma de Muestra',
                                        displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}, </tpl>'),
                                        tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
                                    }]
                            }]
                    }, {
                        xtype: 'container',
                        items: [{
                                xtype: 'fieldset',
                                title: 'Antecedentes',
                                defaults: {
                                    allowBlank: false,
                                    width: 260,
                                    labelAlign: 'top'
                                },
                                items: [{
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            width: 240,
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
                                                name: 'edadPrimeraRelacionSexual',
                                                fieldLabel: 'Primera Relacion Sexual',
                                                emptyText: 'Inserte edad de la primera relacion sexual',
                                                disabled: true
                                            }]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            width: 240,
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
                                                name: 'edadPrimerEmbarazo',
                                                fieldLabel: 'Edad Primer Embarazo',
                                                emptyText: 'Inserte edad del primer embarazo',
                                                disabled: true
                                            }]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            width: 240,
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
                                                name: 'numeroPartos',
                                                fieldLabel: 'N\u00famero de Partos',
                                                emptyText: 'Inserte N\u00famero de Partos',
                                                disabled: true
                                            }]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            width: 240,
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
                                                name: 'yearMenopausia',
                                                fieldLabel: 'A\u00f1o de Menopausia',
                                                emptyText: 'Inserte A\u00f1o de Menopausia',
                                                disabled: true
                                            }]
                                    }, {
                                        xtype: 'datefield',
                                        name: 'ultimaMestruacion',
                                        fieldLabel: 'Ultima Mestruaci\u00f3n',
                                        emptyText: 'Inserte A\u00f1o de Menopausia'
                                    }, {
                                        xtype: 'combo',
                                        labelAlign: 'top',
                                        store: {
                                            fields: ['idMetrorragia', 'metrorragia', {name: 'objeto', persist: false}],
                                            data: [
                                                {idMetrorragia: 1, metrorragia: 'Continua', objeto: {idMetrorragia: 1, metrorragia: 'Continua'}},
                                                {idMetrorragia: 2, metrorragia: 'Al Coito', objeto: {idMetrorragia: 2, metrorragia: 'Al Coito'}},
                                                {idMetrorragia: 3, metrorragia: 'Intermestrual', objeto: {idMetrorragia: 3, metrorragia: 'Intermestrual'}}
                                            ]
                                        },
                                        name: 'metrorragia',
                                        fieldLabel: 'Metrorragia',
                                        displayField: 'metrorragia',
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione Metrorragia'
                                    }, {
                                        xtype: 'combo',
                                        store: 'TiposAnticonceptivos',
                                        name: 'tipoAnticonceptivo',
                                        fieldLabel: 'Tipo Anticonceptivo',
                                        displayField: 'nombreAnticonceptivo',
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione Tipo Anticonceptivo',
                                        displayTpl: new Ext.XTemplate('<tpl for=".">{nombreAnticonceptivo} <tpl if="oral">(Oral)</tpl> </tpl>'),
                                        tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombreAnticonceptivo} <tpl if="oral">(Oral)</tpl></div></tpl>')
                                    }, {
                                        xtype: 'combo',
                                        store: 'EnfermedadesTransmisionSexual',
                                        name: 'enfermedadesTransmisionSexual',
                                        fieldLabel: 'Enfermedades Transmision',
                                        multiSelect: true,
                                        displayField: 'enfermedad',
                                        valueField: 'objeto',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione Enfermedades'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'otros',
                                        fieldLabel: 'Otros Tratamientos',
                                        emptyText: 'Inserte Otros Tratamientos'
                                    }]
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'modificar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});