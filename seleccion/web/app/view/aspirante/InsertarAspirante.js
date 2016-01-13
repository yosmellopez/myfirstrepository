Ext.define('Seleccion.view.aspirante.InsertarAspirante', {
    extend: 'Ext.window.Window',
    title: 'Insertar Aspirante',
    alias: 'widget.insertarAspirante',
    modal: true,
    contador: 0,
    viewModel: {
        data: {
            accion: 'insertar',
            iconoFinalizar: 'icon-arrow-right',
            botonValido: false
        }
    },
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                reference: 'layout',
                items: [{
                        xtype: 'fieldset',
                        title: 'Datos Aspirante',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                                xtype: 'container',
                                margin: '0 5 0 0',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 150,
                                    width: 405,
                                    enableKeyEvents: true
                                },
                                items: [{
                                        xtype: 'textfield',
                                        name: 'nombre',
                                        fieldLabel: 'Nombre',
                                        escrito: true,
                                        emptyText: 'Inserte el nombre',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'apellidos',
                                        fieldLabel: 'Apellidos',
                                        emptyText: 'Inserte los Apellidos',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'ci',
                                        fieldLabel: 'Carne Identidad',
                                        emptyText: 'Inserte  el carne identidad',
                                        maxLength: 11,
                                        minLength: 11,
                                        action: 'escribir'
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'edad',
                                        fieldLabel: 'Edad',
                                        emptyText: 'Inserte la edad',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Sexo',
                                        layout: {type: 'hbox', align: 'stretch'},
                                        defaults: {
                                            labelWidth: 70
                                        },
                                        items: [{
                                                xtype: 'radio',
                                                name: 'sexo',
                                                checked: true,
                                                fieldLabel: 'Masculino',
                                                margin: '0 20 0 0',
                                                inputValue: true
                                            }, {
                                                xtype: 'radio',
                                                name: 'sexo',
                                                fieldLabel: 'Femenino',
                                                inputValue: false
                                            }]
                                    }, {
                                        xtype: 'textarea',
                                        name: 'direccion',
                                        fieldLabel: 'Direccion',
                                        emptyText: 'Inserte la direccion',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'fieldset',
                                        title: 'Datos del Padre',
                                        defaults: {
                                            labelWidth: 135,
                                            width: 370
                                        },
                                        items: [{
                                                xtype: 'textfield',
                                                name: 'nombrePadre',
                                                fieldLabel: 'Nombre y Apellidos'
                                            }]
                                    }]
                            }, {
                                xtype: 'container',
                                margin: '0 0 0 5',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 150,
                                    width: 405,
                                    enableKeyEvents: true
                                },
                                items: [{
                                        xtype: 'textfield',
                                        name: 'antecedentePatologico',
                                        fieldLabel: 'Antecedente Patologico',
                                        emptyText: 'Inserte el Antecedente Patologico',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'antecedentePenal',
                                        fieldLabel: 'Antecedente Penal',
                                        emptyText: 'Inserte Antecedente Penal',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'textarea',
                                        name: 'antecedenteFamiliar',
                                        fieldLabel: 'Antecedente Familiar',
                                        emptyText: 'Inserte Antecedente Familiar',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'numHijos',
                                        minLenght: 1,
                                        maxLenght: 2,
                                        minLenghtText: 'Este campo debe contener al menos un digito',
                                        maxLenghtText: 'Este campo debe contener como maximo dos digitos',
                                        fieldLabel: 'Numero de Hijos',
                                        emptyText: 'Inserte Numero de Hijos',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: 'Problemas Familiares',
                                        name: 'problemaFamiliar',
                                        emptyText: 'Inserte Problemas Familiares',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'numberfield',
                                        name: 'personasConvivencia',
                                        fieldLabel: 'Personas que Convive',
                                        emptyText: 'Inserte la Personas que Convive',
                                        action: 'escribir'
                                    }, {
                                        xtype: 'fieldset',
                                        title: 'Datos de la Madre',
                                        defaults: {
                                            labelWidth: 135,
                                            width: 370
                                        },
                                        items: [{
                                                xtype: 'textfield',
                                                name: 'nombreMadre',
                                                fieldLabel: 'Nombre y Apellidos'
                                            }]
                                    }]
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'insertar',
                iconCls: 'icon-ok-sign'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close,
                iconCls: 'icon-remove-sign'
            }];
        this.callParent(arguments);
    }
});

