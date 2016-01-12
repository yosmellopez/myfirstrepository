Ext.define('Citologia.view.ingreso.BuscarIngreso', {
    extend: 'Ext.panel.Panel',
    title: '<i class="fa fa-search-plus"></i>Buscar Ingreso',
    collapsible: true,
    split: true,
    collapsed: true,
    titleCollapse: true,
    frame: true,
    alias: 'widget.busquedasingresos',
    items: [{
            xtype: 'form',
            bodyPadding: 5,
            frame: true,
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                width: 360,
                style: {
                    marginLeft: '7px'
                }
            },
            items: [{
                    xtype: 'fieldset',
                    columnWidth: 0.2,
                    title: 'Busquedas',
                    defaults: {
                        width: 335,
                        labelWidth: 90
                    },
                    items: [{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Paciente',
                            defaultType: 'radiofield',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {right: 15}
                            },
                            items: [{
                                    boxLabel: 'Ingresados',
                                    name: 'egresado',
                                    inputValue: 'false'
                                }, {
                                    boxLabel: 'Todos',
                                    name: 'egresado',
                                    inputValue: '',
                                    checked: true
                                }]
                        }]
                }, {
                    xtype: 'fieldset',
                    columnWidth: 0.2,
                    title: 'Busquedas',
                    defaults: {
                        width: 335,
                        labelWidth: 100
                    },
                    items: [{
                            xtype: 'numberfield',
                            name: 'paciente.historiaClinica',
                            fieldLabel: 'Historia Clinica',
                            hideTrigger: true,
                            emptyText: 'Inserte Historia Clínica'
                        }]
                }, {
                    xtype: 'fieldset',
                    columnWidth: 0.2,
                    title: 'Datos Ingreso',
                    defaults: {
                        width: 335,
                        labelWidth: 120
                    },
                    items: [{
                            xtype: 'combo',
                            name: 'cama.sala.idSala',
                            fieldLabel: 'Sala',
                            store: 'Salas',
                            valueField: 'idSala',
                            id: 'comboSalaBuscar',
                            displayField: 'nombreSala',
                            queryMode: 'local',
                            action: 'seleccionar',
                            emptyText: 'Selección Sala'
                        }, {
                            xtype: 'combo',
                            name: 'cama.idCama',
                            fieldLabel: 'Cama Destino',
                            store: 'Camas',
                            valueField: 'idCama',
                            id: 'comboCamaBuscar',
                            action: 'selecionarCama',
                            displayField: 'numeroCama',
                            queryMode: 'local',
                            emptyText: 'Selección Cama', displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">{numeroCama} <tpl if="habilitada==true">(Desabilitada)<tpl else>(Habilitada)</tpl></tpl>'),
                            tpl: Ext.create('Ext.XTemplate', '<tpl for="."><div class="x-boundlist-item">{numeroCama} <tpl if="habilitada==true">(Desabilitada)<tpl else>(Habilitada)</tpl></div></tpl>')

                        }]
                }, {
                    xtype: 'fieldset',
                    title: 'Rangos de Fechas',
                    width: 360,
                    height: 50,
                    layout: {
                        type: 'hbox',
                        defaultMargins: {right: 3}
                    },
                    items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Desde',
                            labelWidth: 35,
                            width: 167,
                            name: 'rangoIfecha',
                            vtype: 'rangoFecha',
                            itemId: 'fechaInicioBI',
                            fechaFinal: 'fechaFinalBI'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Hasta',
                            width: 167,
                            name: 'rangoFfecha',
                            labelWidth: 33,
                            vtype: 'rangoFecha',
                            itemId: 'fechaFinalBI',
                            fechaInicio: 'fechaInicioBI'
                        }]
                }]
        }],
    buttons: [{
            xtype: 'button',
            text: 'Buscar Ingresos',
            scale: 'medium',
            action: 'buscar',
            iconCls: 'buscar',
            buttonAlign: 'center'
        }, {
            text: 'Limpiar',
            scale: 'medium',
            iconCls: 'limpiar',
            handler: function (bot) {
                bot.up('panel').down('form').getForm().reset();
            }
        }],
    listeners: {
        expand: function (panel) {
            grid = panel.up('grid');
            grid.animate({from: {height: grid.getHeight()}, to: {height: grid.getHeight() + 190}});
        },
        collapse: function (panel) {
            grid = panel.up('grid');
            grid.animate({from: {height: grid.getHeight()}, to: {height: grid.getHeight() - 190}});
        }
    }
});