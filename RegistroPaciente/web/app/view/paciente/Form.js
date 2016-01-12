Ext.define('Registro.view.paciente.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pacienteform',
    padding: '10 5 10 5',
    style: 'background-color: #fff;',
    border: false,
    layout: {
        type: 'hbox',
        defaultMargins: {
            right: 10
        }
    },
    initComponent: function () {
        this.items = [{
                xtype: 'container',
                width: 368,
                defaults: {
                    allowBlank: false,
                    labelWidth: 190,
                    width: 368,
                    xtype: 'textfield'
                },
                items: [{
                        name: 'historiaClinica',
                        fieldLabel: 'Numero de Historia Clinica',
                        xtype: 'numberfield'
                    }, {
                        name: 'ci',
                        fieldLabel: 'CI',
                        vtype: 'ci'
                    }, {
                        name: 'nombre',
                        fieldLabel: 'Nombre del Paciente',
                        vtype: 'nombre'
                    }, {
                        name: 'apellidos',
                        fieldLabel: 'Apellidos del Paciente',
                        vtype: 'apellidos'
                    }, {
                        xtype: 'textarea',
                        name: 'direccionParticular',
                        fieldLabel: 'Direccion particular',
                        vtype: 'vacio'
                    }, {
                        name: 'telefono',
                        fieldLabel: 'Telefono',
                        xtype: 'numberfield',
                        allowBlank: true
                    }, {
                        name: 'diagnostico',
                        fieldLabel: 'Diagnostico',
                        vtype: 'vacio'
                    }, {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        name: 'fechaEntrada',
                        fieldLabel: 'Fecha Entrada',
                        vtype: 'rangoFecha',
                        itemId: 'fechaInicio',
                        fechaFinal: 'fechaFin'
                    }, {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        name: 'fechaProbableOperacion',
                        fieldLabel: 'Fecha Probable para su Operaci\u00f3n',
                        vtype: 'rangoFecha',
                        itemId: 'fechaFin',
                        fechaInicio: 'fechaInicio'
                    }]
            }, {
                xtype: 'container',
                width: 368,
                defaults: {
                    allowBlank: false,
                    labelWidth: 190,
                    width: 368,
                    xtype: 'textfield'
                },
                items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Sexo',
                        labelWidth: 190,
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                right: 5
                            }
                        },
                        items: [{
                                xtype: 'radio',
                                name: 'sexo',
                                labelWidth: 60,
                                inputValue: true,
                                fieldLabel: 'Masculino',
                                checked: true
                            }, {
                                xtype: 'radio',
                                name: 'sexo',
                                labelWidth: 60,
                                inputValue: false,
                                fieldLabel: 'Femenino'
                            }]
                    }, {
                        name: 'patologiaTumoral',
                        fieldLabel: 'Patologia Tumoral',
                        vtype: 'vacio'
                    }, {
                        name: 'grupoFactor',
                        fieldLabel: 'Grupo Factor',
                        xtype: 'combo',
                        queryMode: 'local',
                        store: {
                            fields: ['grupo'],
                            data: [{grupo: 'O+'}, {grupo: 'O-'}, {grupo: 'A+'}, {grupo: 'A-'}, {grupo: 'B+'}, {grupo: 'B-'}, {grupo: 'AB+'}, {grupo: 'AB-'}]
                        },
                        valueField: 'grupo',
                        displayField: 'grupo'
                    }, {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        name: 'fechaRegistroBaja',
                        fieldLabel: 'Fecha del Registro de Baja'
                    }, {
                        name: 'comentarioObservaciones',
                        fieldLabel: 'Comentario Observaciones'
                    }, {
                        xtype: 'combo',
                        store: 'AreasSalud',
                        name: 'areaSalud',
                        fieldLabel: 'Area de Salud',
                        displayField: 'nombre',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Area de Salud'
                    }, {
                        xtype: 'combo',
                        store: 'Especialidades',
                        name: 'especialidad',
                        fieldLabel: 'Especialidad',
                        displayField: 'especialidad',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Especialidad'
                    }, {
                        name: 'listaEspera',
                        fieldLabel: 'Lista de Espera',
                        xtype: 'combo',
                        store: 'ListaEsperas',
                        displayField: 'nombreLista',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Lista de Espera'
                    }, {
                        name: 'causaBaja',
                        fieldLabel: 'Causa de la Baja',
                        xtype: 'combo',
                        store: 'Causas',
                        displayField: 'causa',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione causa de la baja'
                    }]
            }];
        this.callParent(arguments);
    }
});