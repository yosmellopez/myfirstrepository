Ext.define('Registro.view.operacion.BusquedaOperacion', {
    extend: 'Ext.form.Panel',
    title: 'Busqueda de Operaciones',
    alias: 'widget.busquedaOperacion',
    layout: {
        type: 'hbox',
        defaultMargins: {right: 5}
    },
    split: true,
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    items: [{
            xtype: 'fieldset',
            title: 'Datos del Paciente',
            defaultType: 'textfield',
            flex: 1,
            defaults: {
                labelAlign: 'left',
                labelWidth: 150,
                width: '100%'
            },
            items: [{
                    name: 'likeLpaciente.nombre',
                    fieldLabel: 'Nombre del Paciente'
                }, {
                    name: 'likeLpaciente.apellidos',
                    fieldLabel: 'Apellidos del Paciente'
                }, {
                    name: 'likeLpaciente.historiaClinica',
                    fieldLabel: 'Historia Clinica'
                }, {
                    name: 'likeLpaciente.ci',
                    fieldLabel: 'Numero Identidad'
                }]
        }, {
            xtype: 'fieldset',
            title: 'Otros Datos del Paciente',
            defaultType: 'textfield',
            flex: 1,
            layout: 'anchor',
            defaults: {
                labelAlign: 'left',
                labelWidth: 150,
                anchor: '100%'
            },
            items: [{
                    xtype: 'combo',
                    store: 'Grupos',
                    name: 'grupo.idGrupo',
                    fieldLabel: 'Grupo',
                    displayField: 'grupo',
                    valueField: 'idGrupo',
                    queryMode: 'local',
                    autoSelect: false,
                    emptyText: 'Seleccione Grupo'
                }, {
                    xtype: 'combo',
                    store: 'Especialidades',
                    name: 'especialidad.idEspecialidad',
                    fieldLabel: 'Especialidad',
                    displayField: 'especialidad',
                    valueField: 'idEspecialidad',
                    queryMode: 'local',
                    autoSelect: false,
                    emptyText: 'Seleccione Especialidad'
                }, {
                    xtype: 'fieldset',
                    title: 'Rango de fecha de operaci\u00f3n',
                    layout: 'anchor',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        anchor: '100%'
                    },
                    items: [{
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoIfechaOperacion',
                            fieldLabel: 'Fecha Inicial'
                        }, {
                            xtype: 'datefield',
                            format: 'd/m/Y',
                            name: 'rangoFfechaOperacion',
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