Ext.define('Registro.view.operacion.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    registroPaciente: null,
    alias: 'widget.operacionform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
                xtype: 'container',
                items: [{
                        xtype: 'fieldset',
                        title: 'Datos del Paciente',
                        id: 'fieldset',
                        defaultType: 'textfield',
                        height: 150,
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 130,
                            width: 350
                        },
                        items: [{
                                name: 'nombre',
                                fieldLabel: 'Nombre del Paciente'
                            }, {
                                name: 'apellidos',
                                fieldLabel: 'Apellidos del Paciente'
                            }, {
                                name: 'historiaClinica',
                                fieldLabel: 'Historia Clinica'
                            }, {
                                name: 'ci',
                                fieldLabel: 'Numero Identidad'
                            }, {
                                xtype: 'checkbox',
                                name: 'cancerDetectado',
                                fieldLabel: 'Cancer Detectado',
                                inputValue: true
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Otros Datos de la Operaci\u00f3n',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 130,
                            width: 350
                        },
                        items: [{
                                xtype: 'combo',
                                store: 'Grupos',
                                name: 'grupo',
                                fieldLabel: 'Grupo',
                                displayField: 'grupo',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                autoSelect: false,
                                displayTpl: new Ext.XTemplate('<tpl for="."><tpl if="grupo.grupo==undefined">{grupo}<tpl else>{grupo.grupo}</tpl></tpl>'),
                                emptyText: 'Seleccione Grupo'
                            }, {
                                xtype: 'combo',
                                store: 'Especialidades',
                                name: 'especialidad',
                                fieldLabel: 'Especialidad',
                                displayField: 'especialidad',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                autoSelect: false,
                                emptyText: 'Seleccione Especialidad',
                                displayTpl: new Ext.XTemplate('<tpl for="."><tpl if="especialidad.especialidad==undefined">{especialidad}<tpl else>{especialidad.especialidad}</tpl></tpl>')
                            }, {
                                xtype: 'combo',
                                store: 'TiposOperaciones',
                                name: 'tipoOperacion',
                                fieldLabel: 'Tipo de Operaci\u00f3n',
                                displayField: 'tipo',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                forceSelection: true,
                                autoSelect: false,
                                emptyText: 'Seleccione Tipo de Operaci\u00f3n'
                            }, {
                                xtype: 'datefield',
                                format: 'd/m/Y',
                                name: 'fechaOperacion',
                                fieldLabel: 'Fecha de Operaci\u00f3n'
                            }, {
                                xtype: 'checkbox',
                                name: 'pacienteFallecido',
                                fieldLabel: 'Fallecido',
                                inputValue: true
                            }, {
                                xtype: 'checkbox',
                                name: 'cancerDetectado',
                                fieldLabel: 'Cancer Detectado',
                                inputValue: true
                            }]
                    }]
            }];
        //Definimos qué tiene que aparecer en la parte inferior (un botón de guardar).                

        this.callParent(arguments);
    },
    loadDatosPaciente: function (paciente) {
        fielset = this.queryById('fieldset');
        items = fielset.items;
        items.each(function (item) {
            elemento = fielset.down('[name=' + item.name + ']');
            elemento.setValue(paciente[item.name]);
        });
    },
    setRegistroPaciente: function (paciente) {
        this.registroPaciente = paciente;
    },
    getRegistroPaciente: function () {
        return this.registroPaciente;
    }
});