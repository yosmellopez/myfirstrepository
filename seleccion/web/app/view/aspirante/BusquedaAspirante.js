Ext.define('Seleccion.view.aspirante.BusquedaAspirante', {
    extend: 'Ext.form.Panel',
    title: 'Buscar Aspirantes',
    alias: 'widget.busquedaAspirante',
    id: 'busquedaAspirante',
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
                title: 'Busqueda de Aspirantes',
                layout: {type: 'hbox', defaultMargins: {right: 10}, align: 'stretchmax', stretchMaxPartner: 'busquedaAspirante'},
                items: [{
                        xtype: 'textfield',
                        name: 'likeLnombre',
                        fieldLabel: 'Nombre',
                        escrito: true,
                        emptyText: 'Inserte el nombre',
                        action: 'escribir'
                    }, {
                        xtype: 'textfield',
                        name: 'likeLapellidos',
                        fieldLabel: 'Apellidos',
                        emptyText: 'Inserte los Apellidos',
                        action: 'escribir'
                    }, {
                        xtype: 'numberfield',
                        name: 'likeLci',
                        fieldLabel: 'Carne Identidad',
                        emptyText: 'Inserte  el carne identidad'
                    }, {
                        xtype: 'numberfield',
                        name: 'edad',
                        fieldLabel: 'Edad',
                        emptyText: 'Inserte la edad',
                        action: 'escribir'
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Sexo',
                        layout: {type: 'hbox', align: 'stretch'},
                        defaults: {
                            labelWidth: 70
                        },
                        items: [{
                                xtype: 'radio',
                                name: 'sexo',
                                checked: true,
                                fieldLabel: 'Masculino',
                                margin: '0 20 0 0',
                                inputValue: true
                            }, {
                                xtype: 'radio',
                                name: 'sexo',
                                fieldLabel: 'Femenino',
                                inputValue: false
                            }]
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