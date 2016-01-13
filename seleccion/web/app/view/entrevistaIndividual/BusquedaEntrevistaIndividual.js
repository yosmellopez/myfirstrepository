Ext.define('Seleccion.view.entrevistaIndividual.BusquedaEntrevistaIndividual', {
    extend: 'Ext.form.Panel',
    title: 'Buscar Entrevista Individual',
    alias: 'widget.busquedaEntrevistaIndividual',
    id: 'busquedaEntrevistaIndividual',
    collapsible: true,
    iconCls: 'fa fa-search',
    bodyPadding: 5,
    minWidth: '100%',
    collapsed: true,
    frame: true,
    titleCollapse: true,
    defaults: {
        labelAlign: 'top',
        margin: '0 5 0 0',
        flex: 1
    },
    initComponent: function () {
        this.items = [{
                xtype: 'fieldset',
                title: 'Busqueda de Cronograma de Cursos',
                layout: {type: 'hbox', defaultMargins: {right: 10}, align: 'stretchmax', stretchMaxPartner: 'busquedaAspirante'},
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
                                emptyText: 'Seleccione la fecha de SMG'
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
                                emptyText: 'Inserte pais internacionaista'
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