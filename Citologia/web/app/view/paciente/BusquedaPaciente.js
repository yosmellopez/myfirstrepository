Ext.define('Citologia.view.paciente.BusquedaPaciente', {
    extend: 'Ext.form.Panel',
    title: '<i class="fa fa-search-plus fa-1-4x"></i>Buscar Pacientes',
    alias: 'widget.busquedaPaciente',
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
                    type: 'anchor',
                    anchor: '100%'
                },
                defaults: {
                    labelWidth: 120,
                    width: '100%'
                },
                items: [{
                        xtype: 'textfield',
                        name: 'likeLnombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLprimerApellido',
                        fieldLabel: 'Primer Apellido',
                        emptyText: 'Inserte Primer Apellido'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLsegundoApellido',
                        fieldLabel: 'Segundo Apellido',
                        emptyText: 'Inserte Segundo Apellido'
                    }, {
                        xtype: 'numberfield',
                        name: 'likeLci',
                        anchor: '100%',
                        labelWidth: 146,
                        fieldLabel: 'No. Identidad',
                        emptyText: 'Inserte No. Identidad'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLhistoriaClinica',
                        fieldLabel: 'Historia Cl\u00ednica',
                        emptyText: 'Introduzca Historia Cl\u00ednica'
                    }]
            }, {
                xtype: 'container',
                flex: 1,
                defaults: {
                    labelWidth: 120,
                    width: '100%'
                },
                layout: {
                    type: 'anchor',
                    anchor: '100%'
                },
                items: [{
                        xtype: 'numberfield',
                        name: 'edad',
                        anchor: '100%',
                        labelWidth: 146,
                        fieldLabel: 'Edad',
                        emptyText: 'Inserte Edad'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLocupacion',
                        fieldLabel: 'Ocupaci\u00f3n',
                        emptyText: 'Inserte Ocupaci\u00f3n'
                    }, {
                        xtype: 'checkbox',
                        name: 'detencionPrecoz',
                        labelWidth: 146,
                        labelAlign: 'left',
                        inputValue: true,
                        fieldLabel: 'Detenci\u00f3n Precoz'
                    }, {
                        xtype: 'numberfield',
                        name: 'telefono',
                        anchor: '100%',
                        labelWidth: 146,
                        fieldLabel: 'Tel\u00e9fono',
                        emptyText: 'Inserte Tel\u00e9fono'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLconsulta',
                        labelWidth: 146,
                        anchor: '100%',
                        fieldLabel: 'Nombre de Consulta',
                        emptyText: 'Inserte Nombre de Consulta'
                    }]
            }, {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'anchor',
                    anchor: '100%'
                },
                defaults: {
                    labelWidth: 120,
                    width: '100%',
                    anchor: '100%'
                },
                items: [{
                        xtype: 'combo',
                        store: 'AreasSalud',
                        name: 'consultorio.areaSalud.idAreaSalud',
                        fieldLabel: 'Area de Salud',
                        displayField: 'nombre',
                        valueField: 'idAreaSalud',
                        action: 'filtrarConsultorios',
                        queryMode: 'local',
                        forceSelection: true,
                        emptyText: 'Seleccione Area de Salud',
                        width: '100%'
                    }, {
                        xtype: 'combo',
                        store: 'Consultorios',
                        name: 'consultorio',
                        fieldLabel: 'Consultorio',
                        displayField: 'nombre',
                        valueField: 'idConsultorio',
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Consultorio',
                        width: '100%'
                    }, {
                        xtype: 'combo',
                        store: 'Provincias',
                        submitValue: false,
                        fieldLabel: 'Provincia',
                        displayField: 'provincia',
                        action: 'filtrarMunicipios',
                        valueField: 'idProvincia',
                        queryMode: 'local',
                        editable: false,
                        autoSelect: false,
                        emptyText: 'Seleccione Provincia',
                        width: '100%'
                    }, {
                        xtype: 'combo',
                        store: 'Municipios',
                        name: 'municipio.idMunicipio',
                        fieldLabel: 'Municipio',
                        displayField: 'municipio',
                        valueField: 'idMunicipio',
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Municipio',
                        width: '100%'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLdireccion',
                        fieldLabel: 'Direcci\u00f3n',
                        emptyText: 'Inserte Direcci\u00f3n'
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
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
        }
    }
});