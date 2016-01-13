Ext.define('Seleccion.view.cronogramaCurso.BusquedaCronogramaCurso', {
    extend: 'Ext.form.Panel',
    title: 'Buscar Cronograma Curso',
    alias: 'widget.busquedaCronogramaCurso',
    id: 'busquedaCronogramaCurso',
    collapsible: true,
    iconCls: 'fa fa-search',
    bodyPadding: 5,
    minWidth: '100%',
    collapsed: true,
    frame: true,
    titleCollapse: true,
    initComponent: function () {
        this.items = [{
                xtype: 'fieldset',
                title: 'Busqueda de Cronograma de Cursos',
                layout: {type: 'hbox', defaultMargins: {right: 10}, align: 'stretchmax', stretchMaxPartner: 'busquedaAspirante'},
                items: [{
                        xtype: 'container',
                        flex: 1,
                        margin: '0 10 0 0',
                        layout: {
                            type: 'anchor'
                        },
                        defaults: {
                            anchor: '100%',
                            labelWidth: 115
                        },
                        items: [{
                                xtype: 'combo',
                                store: 'TiposCursos',
                                name: 'tipoCurso.idTipoCurso',
                                fieldLabel: 'Tipo de Curso',
                                displayField: 'tipoCurso',
                                valueField: 'idTipoCurso',
                                queryMode: 'local',
                                emptyText: 'Seleccione el tipo de curso'
                            }, {
                                xtype: 'fieldset',
                                title: 'Rango de fechas de Inicio',
                                layout: {
                                    type: 'anchor'
                                },
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'rangoIfechaInicio',
                                        fieldLabel: 'Rango Inicial',
                                        emptyText: 'Seleccione rango inicial'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'rangoFfechaInicio',
                                        fieldLabel: 'Rango Final',
                                        emptyText: 'Seleccione rango final'
                                    }]
                            }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'anchor'
                        },
                        defaults: {
                            anchor: '100%',
                            labelWidth: 115
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'likeLlugar',
                                fieldLabel: 'Lugar',
                                emptyText: 'Inserte el lugar del curso'
                            }, {
                                xtype: 'fieldset',
                                title: 'Rango de fechas de terminaci\u00f3n',
                                layout: {
                                    type: 'anchor'
                                },
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [{
                                        xtype: 'datefield',
                                        name: 'rangoIfechaFin',
                                        fieldLabel: 'Rango Inicial',
                                        emptyText: 'Seleccione rango inicial'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'rangoFfechaFin',
                                        fieldLabel: 'Rango Final',
                                        emptyText: 'Seleccione rango final'
                                    }]
                            }]

                    }]
            }];
        this.buttons = [{
                text: 'Buscar',
                scale: 'medium',
                iconCls: 'fa fa-search fa-1x',
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