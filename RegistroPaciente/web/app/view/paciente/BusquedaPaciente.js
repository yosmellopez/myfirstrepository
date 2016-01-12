Ext.define('Registro.view.paciente.BusquedaPaciente', {
    extend: 'Ext.form.Panel',
    title: 'Busqueda de Operaciones',
    alias: 'widget.busquedaPaciente',
    layout: {
        type: 'hbox',
        defaultMargins: {right: 5}
    },
    split: true,
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    bodyPadding: 5,
    items: [{
            xtype: 'container',
            flex: 1,
            defaults: {
                allowBlank: false,
                labelWidth: 190,
                width: 368,
                xtype: 'textfield',
                anchor: '100%'
            },
            layout: {
                type: 'anchor'
            },
            items: [{
                    name: 'likeLhistoriaClinica',
                    fieldLabel: 'Numero de Historia Clinica',
                    xtype: 'numberfield'
                }, {
                    name: 'likeLci',
                    fieldLabel: 'CI',
                    vtype: 'ci'
                }, {
                    name: 'likeLnombre',
                    fieldLabel: 'Nombre del Paciente',
                    vtype: 'nombre'
                }, {
                    name: 'likeLapellidos',
                    fieldLabel: 'Apellidos del Paciente',
                    vtype: 'apellidos'
                }, {
                    name: 'likeLdireccionParticular',
                    fieldLabel: 'Direccion particular',
                    vtype: 'vacio'
                }, {
                    name: 'likeLtelefono',
                    fieldLabel: 'Telefono',
                    xtype: 'numberfield'
                }, {
                    name: 'likeLdiagnostico',
                    fieldLabel: 'Diagnostico'
                }, {
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
                            fieldLabel: 'Masculino'
                        }, {
                            xtype: 'radio',
                            name: 'sexo',
                            labelWidth: 60,
                            inputValue: false,
                            fieldLabel: 'Femenino'
                        }]
                }, {
                    xtype: 'fieldset',
                    title: 'Rango de Fecha de Entrada',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {right: 5}
                    },
                    defaults: {
                        labelWidth: 80,
                        width: 240
                    },
                    items: [{
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoIfechaEntrada',
                            fieldLabel: 'Fecha Inicial',
                            margin: '0 0 0 100'
                        }, {
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoFfechaEntrada',
                            fieldLabel: 'Fecha Final'
                        }]
                }]
        }, {
            xtype: 'container',
            flex: 1,
            defaults: {
                allowBlank: false,
                labelWidth: 190,
                width: 368,
                xtype: 'textfield',
                anchor: '100%'
            },
            layout: {
                type: 'anchor'
            },
            items: [{
                    name: 'patologiaTumoral',
                    fieldLabel: 'Patologia Tumoral',
                    vtype: 'vacio'
                }, {
                    name: 'grupoFactor',
                    fieldLabel: 'Grupo Factor',
                    vtype: 'vacio'
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
                    name: 'areaSalud.idAreaSalud',
                    fieldLabel: 'Area de Salud',
                    displayField: 'nombre',
                    valueField: 'idAreaSalud',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    autoSelect: false,
                    emptyText: 'Seleccione Area de Salud'
                }, {
                    xtype: 'combo',
                    store: 'Especialidades',
                    name: 'especialidad.idEspecialidad',
                    fieldLabel: 'Especialidad',
                    displayField: 'especialidad',
                    valueField: 'idEspecialidad',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    autoSelect: false,
                    emptyText: 'Seleccione Especialidad'
                }, {
                    name: 'listaEspera.idListaEspera',
                    fieldLabel: 'Lista de Espera',
                    xtype: 'combo',
                    store: 'ListaEsperas',
                    displayField: 'nombreLista',
                    valueField: 'idListaEspera',
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
                }, {
                    xtype: 'fieldset',
                    title: 'Rango de Fecha de Probable Operacion',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {right: 5}
                    },
                    defaults: {
                        labelWidth: 80,
                        width: 240
                    },
                    items: [{
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoIfechaProbableOperacion',
                            fieldLabel: 'Fecha Inicial',
                            margin: '0 0 0 100'
                        }, {
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoFfechaProbableOperacion',
                            fieldLabel: 'Fecha Final'
                        }]
                }]
        }],
    buttons: [{
            text: 'Buscar Operaciones',
            scale: 'medium',
            action: 'buscar'
        }, {
            text: 'Limpiar Formulario',
            scale: 'medium',
            handler: function () {
                form = this.up('form');
                form.getForm().reset();
            }
        }],
    listeners: {
        collapse: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
        }
    }
});