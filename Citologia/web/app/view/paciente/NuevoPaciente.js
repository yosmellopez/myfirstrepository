Ext.define('Citologia.view.paciente.NuevoPaciente', {
    extend: 'Ext.window.Window',
    header: {
        xtype: 'header',
        titleAlign: 'center',
        title: 'Nuevo Paciente',
        height: 50
    },
    alias: 'widget.nuevoPaciente',
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
                                xtype: 'numberfield',
                                name: 'historiaClinica',
                                fieldLabel: 'Historia Cl\u00ednica',
                                emptyText: 'Introduzca Historia Cl\u00ednica',
                                minLength: 4,
                                maxLength: 5,
                                hideTrigger: true,
                                minLengthText: 'El tama\u00f1o del campo debe ser mayor que 3 y menor que 6 caracteres',
                                maxLengthText: 'El tama\u00f1o del campo debe ser mayor que 3 y menor que 6 caracteres',
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: function (a, evento) {
                                        valor = new String(a.getValue());
                                        if (valor.length > 4)
                                            evento.stopEvent();
                                    }
                                }
                            }, {
                                xtype: 'numberfield',
                                name: 'ci',
                                vtype: 'ci',
                                fieldLabel: 'No. Identidad',
                                minLength: 11,
                                maxLength: 11,
                                minLengthText: 'El tama\u00f1o del campo debe ser de 11 caracteres',
                                maxLengthText: 'El tama\u00f1o del campo debe ser de 11 caracteres',
                                emptyText: 'Inserte No. Identidad',
                                enableKeyEvents: true,
                                listeners: {
                                    keypress: function (a, evento) {
                                        valor = new String(a.getValue() === null ? 0 : a.getValue());
                                        console.log(valor.length);
                                        console.log(valor);
                                        if (valor.length > 10)
                                            evento.stopEvent();
                                        if (valor.length > 1) {
                                            year = parseInt(valor.substr(0, 2));
                                            var hoy = new Date();
                                            cmp = a.next();
//                                            console.log(hoy.getFullYear());
                                            cmp.setValue(hoy.getFullYear() - year - 1900);
                                        }
                                    }
                                }
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
                                labelAlign: 'left',
                                labelWidth: 130,
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
                                name: 'consultorio',
                                fieldLabel: 'Area de Salud',
                                displayField: 'nombre',
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
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                forceSelection: true,
                                autoSelect: false,
                                emptyText: 'Seleccione Consultorio'
                            }, {
                                xtype: 'combo',
                                store: 'Provincias',
                                submitValue: false,
                                fieldLabel: 'Provincia',
                                displayField: 'provincia',
                                action: 'filtrarMunicipios',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                editable: false,
                                autoSelect: false,
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
                                forceSelection: true,
                                autoSelect: false,
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
                action: 'insertar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});