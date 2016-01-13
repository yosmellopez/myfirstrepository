Ext.define('Seleccion.view.entrevistaIndividual.ModificarEntrevistaIndividual', {
    extend: 'Ext.window.Window',
    title: 'Modificar Entrevista Individual',
    alias: 'widget.modificarEntrevIndiv',
    modal: true,
    id: 'entrevistaIndividual',
    paso: 1,
    viewModel: {
        data: {
            accion: 'insertar',
            iconoFinalizar: 'icon-arrow-right',
            botonValido: false,
            step0: true,
            step1: false,
            step2: false,
            step3: false
        }
    },
    tbar: {
        id: "progress",
        defaultButtonUI: "wizard-soft-purple",
        cls: "wizardprogressbar",
        defaults: {disabled: true, iconAlign: "top"},
        layout: {pack: "center"},
        items: [{
                iconCls: "fa fa-info",
                bind: {pressed: '{step0}'},
                enableToggle: true,
                text: "Datos Generales"
            }, {
                bind: {pressed: '{step1}'},
                iconCls: "ion-person-stalker",
                enableToggle: true,
                text: "Convivencias"
            }, {
                iconCls: "fa fa-home",
                enableToggle: true,
                bind: {pressed: '{step2}'},
                text: "Residencias"
            }, {
                iconCls: "fa fa-check",
                enableToggle: true,
                bind: {pressed: '{step3}'},
                text: "Integraci\u00f3n Revolucionaria"
            }]
    },
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                reference: 'formulario',
                layout: {
                    type: 'card'
                },
                items: [{
                        xtype: 'container',
                        title: 'Entrevista Individual',
                        region: 'center',
                        border: 0,
                        padding: '5 5 5 5',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'container',
                                flex: 1,
                                border: 0,
                                padding: '0 5 0 0',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 140,
                                    width: 360,
                                    action: 'escribir',
                                    enableKeyEvents: true
                                },
                                items: [{
                                        xtype: 'textfield',
                                        name: 'numExpediente',
                                        fieldLabel: 'Num. Expediente',
                                        emptyText: 'Inserte el numero de expediente'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'financiamiento',
                                        fieldLabel: 'Financiamiento',
                                        emptyText: 'Inserte el financiamiento'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'nombreMadre',
                                        fieldLabel: 'Nombre de la Madre',
                                        emptyText: 'Inserte el nombrev de la Madre'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'nombrePadre',
                                        fieldLabel: 'Nombre del Padre',
                                        emptyText: 'Inserte el nombre del padre'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'estatura',
                                        fieldLabel: 'Estatura',
                                        emptyText: 'Inserte la estatura'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'colorPiel',
                                        fieldLabel: 'Color de Piel',
                                        emptyText: 'Inserte el color de la piel'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'colorOjos',
                                        fieldLabel: 'Color de Ojos',
                                        emptyText: 'Inserte el color de los ojos'
                                    }, {
                                        xtype: 'combo',
                                        name: 'estadoCivil',
                                        fieldLabel: 'Estado Civil',
                                        emptyText: 'Seleccione el estado civil',
                                        forceSelection: true,
                                        store: {
                                            fields: ['estadoCivil'],
                                            data: [{estadoCivil: 'Casado (a)'}, {estadoCivil: 'Soltero (a)'}, {estadoCivil: 'Viudo (a)'}]
                                        },
                                        displayField: 'estadoCivil',
                                        valueField: 'estadoCivil'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'numHijos',
                                        fieldLabel: 'Num. Hijos',
                                        emptyText: 'Inserte el numero de hijos'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'edadHijos',
                                        fieldLabel: 'Edad de Hijos',
                                        emptyText: 'Inserte la edad de los hijos'
                                    }]
                            }, {
                                xtype: 'container',
                                flex: 1,
                                padding: '0 0 0 5',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 120,
                                    width: 405,
                                    action: 'escribir',
                                    enableKeyEvents: true
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'fechaEntrevista',
                                        editable: false,
                                        fieldLabel: 'Fecha Entrevista',
                                        emptyText: 'Inserte la fecha de la entrevista'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'proficuo',
                                        fieldLabel: 'Proficuo',
                                        emptyText: 'Inserte proficuo'
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            labelWidth: 120,
                                            margin: '0 5 0 0',
                                            action: 'escribir',
                                            enableKeyEvents: true
                                        },
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [{
                                                xtype: 'checkbox',
                                                name: 'siSmg',
                                                fieldLabel: 'SMG',
                                                reference: 'smgCheck',
                                                inputValue: true
                                            }, {
                                                xtype: 'datefield',
                                                name: 'fechaSmg',
                                                fieldLabel: 'Fecha de SMG',
                                                format: 'd/m/Y',
                                                editable: false,
                                                labelWidth: 90,
                                                width: 257,
                                                emptyText: 'Seleccione la fecha de SMG',
                                                bind: {
                                                    disabled: '{!smgCheck.checked}'
                                                }
                                            }]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            labelWidth: 120,
                                            margin: '0 5 0 0'
                                        },
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [{
                                                xtype: 'checkbox',
                                                name: 'siInternacionalista',
                                                fieldLabel: 'Internacionalista',
                                                emptyText: 'Inserte si fue internacionalista',
                                                reference: 'internacionalistaCheck',
                                                inputValue: true
                                            }, {
                                                xtype: 'textfield',
                                                name: 'paisInternacionalista',
                                                fieldLabel: 'Pais',
                                                labelWidth: 90,
                                                width: 257,
                                                emptyText: 'Inserte pais internacionaista',
                                                bind: {
                                                    disabled: '{!internacionalistaCheck.checked}'
                                                }
                                            }]
                                    }, {
                                        xtype: 'fieldcontainer',
                                        defaults: {
                                            allowBlank: false,
                                            labelWidth: 130,
                                            margin: '0 5 0 0',
                                            action: 'escribir',
                                            enableKeyEvents: true
                                        },
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [{
                                                xtype: 'checkbox',
                                                name: 'procedenciaFar',
                                                labelWidth: 120,
                                                fieldLabel: 'Procedencia Far',
                                                inputValue: true
                                            }, {
                                                xtype: 'checkbox',
                                                name: 'procedenciaMinint',
                                                fieldLabel: 'Procedencia Minint',
                                                inputValue: true
                                            }]
                                    }, {
                                        xtype: 'textfield',
                                        name: 'senasVisibles',
                                        fieldLabel: 'Senas Visibles',
                                        emptyText: 'Inserte senas visibles'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'telefono',
                                        fieldLabel: 'Telefono',
                                        emptyText: 'Inserte telefono'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'nombreEntrevistador',
                                        fieldLabel: 'Investigador',
                                        emptyText: 'Inserte el nombre y apellidos del Investigador'
                                    }, {
                                        xtype: 'combo',
                                        name: 'nivelEscolar',
                                        store: 'NivelesEscolares',
                                        displayField: 'nivelEscolar',
                                        valueField: 'objeto',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        fieldLabel: 'Nivel Escolar',
                                        emptyText: 'Seleccione el nivel escolar'
                                    }, {
                                        xtype: 'combo',
                                        store: 'Aspirantes',
                                        name: 'aspirante',
                                        fieldLabel: 'Aspirante',
                                        displayField: 'nombre',
                                        valueField: 'objeto',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        emptyText: 'Seleccione Aspirante',
                                        displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}</tpl>'),
                                        tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
                                    }]
                            }]
                    }, {
                        xtype: 'panel',
                        title: 'Convivencias',
                        items: [{
                                xtype: 'gridConvivencia',
                                id: 'gridConvivencia',
                                width: 783,
                                bbar: null,
                                height: 378
                            }]
                    }, {
                        xtype: 'panel',
                        title: 'Residencias',
                        items: [{
                                xtype: 'gridResidencia',
                                id: 'gridResidencia',
                                width: 783,
                                bbar: null,
                                height: 378
                            }]
                    }, {
                        xtype: 'gridselectfield',
                        id: 'gridselectfield',
                        store: 'IntegracionesRevolucionarias',
                        fromTitle: 'Habilitados',
                        allowBlank: true,
                        toTitle: 'Seleccionados',
                        searchField: 'integracionRevolucionaria',
                        name: 'integracionesRevolucionarias',
                        disabled: true,
                        action: 'verificar',
                        rightGridId: 'gridSeleccion',
                        leftGridId: 'gridHabilitados',
                        rightAction: 'ver',
                        width: 785,
                        height: 418,
                        flexFrom: 10,
                        flexTo: 10,
                        columns: [{
                                header: 'No',
                                xtype: 'rownumberer'
                            }, {
                                header: 'Integraci\u00f3n Revolucionaria',
                                dataIndex: 'integracionRevolucionaria',
                                flex: 1
                            }, {
                                header: 'Siglas',
                                dataIndex: 'siglas',
                                flex: 0.3
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Atr\u00e1s',
                action: 'atras',
                iconCls: 'icon-arrow-left',
                disabled: true
            }, {
                text: 'Siguiente',
                bind: {
                    action: '{accion}',
                    iconCls: '{iconoFinalizar}',
                    disabled: '{!botonValido}'
                },
                setAction: function (action) {
                    this.action = action;
                }
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close,
                iconCls: 'icon-remove-sign'
            }];
        this.callParent(arguments);
    }
});
