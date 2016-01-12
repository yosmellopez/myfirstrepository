Ext.define('Citologia.view.paciente.ModificarPaciente', {
    extend: 'Ext.window.Window',
    alias: 'widget.modificarPaciente',
    header: {
        xtype: 'header',
        titleAlign: 'center',
        title: 'Modificar Datos Paciente',
        height: 50
    },
    width: 510,
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
                        defaults: {
                            allowBlank: false,
                            labelAlign: 'top',
                            width: 240
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'nombre',
                                fieldLabel: 'Nombre',
                                emptyText: 'Inserte nombre'
                            }, {
                                xtype: 'textfield',
                                name: 'primerApellido',
                                fieldLabel: 'Primer Apellido',
                                emptyText: 'Inserte Primer Apellido'
                            }, {
                                xtype: 'textfield',
                                name: 'segundoApellido',
                                fieldLabel: 'Segundo Apellido',
                                emptyText: 'Inserte Segundo Apellido'
                            }, {
                                name: 'historiaClinica',
                                fieldLabel: 'Historia Cl\u00ednica',
                                emptyText: 'Introduzca Historia Cl\u00ednica',
                                xtype: 'numberfield',
                                minLength: 4,
                                maxLength: 5,
                                hideTrigger: true,
                                minLengthText: 'El tama\u00f1o del campo debe ser mayor que 3 y menor que 6 caracteres',
                                maxLengthText: 'El tama\u00f1o del campo debe ser mayor que 3 y menor que 6 caracteres',
                                enableKeyEvents: true,
                            }, {
                                xtype: 'numberfield',
                                name: 'ci',
                                vtype: 'ci',
                                minLength: 11,
                                maxLength: 11,
                                minLengthText: 'El tama\u00f1o del campo debe ser de 11 caracteres',
                                maxLengthText: 'El tama\u00f1o del campo debe ser de 11 caracteres',
                                emptyText: 'Inserte No. Identidad',
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: function (a, evento) {
                                        valor = new String(a.getValue());
                                        if (valor.length > 10)
                                            evento.stopEvent();
                                    }
                                },
                                fieldLabel: 'No. Identidad'
                            }, {
                                xtype: 'numberfield',
                                name: 'edad',
                                fieldLabel: 'Edad',
                                emptyText: 'Inserte Edad',
                                minValue: 1,
                                maxValue: 150
                            }, {
                                xtype: 'textfield',
                                name: 'ocupacion',
                                fieldLabel: 'Ocupaci\u00f3n',
                                emptyText: 'Inserte Ocupaci\u00f3n'
                            }, {
                                xtype: 'checkbox',
                                name: 'detencionPrecoz',
                                labelWidth: 130,
                                labelAlign: 'left',
                                inputValue: true,
                                fieldLabel: 'Detenci\u00f3n Precoz'
                            }]
                    }, {
                        xtype: 'container',
                        defaults: {
                            allowBlank: false,
                            labelAlign: 'top',
                            width: 240
                        },
                        items: [{
                                xtype: 'numberfield',
                                name: 'telefono',
                                fieldLabel: 'Tel\u00e9fono',
                                emptyText: 'Inserte Tel\u00e9fono'
                            }, {
                                xtype: 'textfield',
                                name: 'consulta',
                                fieldLabel: 'Nombre de Consulta',
                                emptyText: 'Inserte Nombre de Consulta'
                            }, {
                                xtype: 'combo',
                                store: 'AreasSalud',
                                fieldLabel: 'Area de Salud',
                                displayField: 'nombre',
                                id: 'areaSalud',
                                valueField: 'idAreaSalud',
                                submitValue: false,
                                action: 'filtrarConsultorios',
                                allowBlank: false,
                                queryMode: 'local',
                                forceSelection: true,
                                emptyText: 'Seleccione Area de Salud'
                            }, {
                                xtype: 'combo',
                                store: 'Consultorios',
                                name: 'consultorio',
                                fieldLabel: 'Consultorio',
                                displayField: 'nombre',
                                editable: false,
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                displayTpl: new Ext.XTemplate('<tpl for="."><tpl if="nombre.nombre==undefined">{nombre}<tpl else>{nombre.nombre}</tpl></tpl>'),
                                emptyText: 'Seleccione Consultorio'
                            }, {
                                xtype: 'combo',
                                store: 'Provincias',
                                submitValue: false,
                                id: 'provincia',
                                fieldLabel: 'Provincia',
                                displayField: 'provincia',
                                action: 'filtrarMunicipios',
                                valueField: 'objeto',
                                queryMode: 'local',
                                editable: false,
                                emptyText: 'Seleccione Provincia'
                            }, {
                                xtype: 'combo',
                                store: 'Municipios',
                                name: 'municipio',
                                fieldLabel: 'Municipio',
                                displayField: 'municipio',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                displayTpl: new Ext.XTemplate('<tpl for="."><tpl if="municipio.municipio==undefined">{municipio}<tpl else>{municipio.municipio}</tpl></tpl>'),
                                emptyText: 'Seleccione Municipio'
                            }, {
                                xtype: 'textarea',
                                name: 'direccion',
                                fieldLabel: 'Direcci\u00f3n',
                                height: 100,
                                emptyText: 'Inserte Direcci\u00f3n'
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