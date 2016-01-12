Ext.define('Citologia.view.cama.BuscarCama', {
    extend: 'Ext.panel.Panel',
    title: '<i class="fa fa-search-plus"></i>Buscar Cama',
    collapsible: true,
    split: true,
    collapsed: true,
    titleCollapse: true,
    frame: true,
    alias: 'widget.busquedascamas',
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
                    xtype: 'numberfield',
                    name: 'numeroCama',
                    fieldLabel: 'Numero de cama',
                    hideTrigger: true
                }
                , {
                    xtype: 'combo',
                    name: 'sala.nombreSala',
                    fieldLabel: 'Sala',
                    store: 'Salas',
                    valueField: 'nombreSala',
                    displayField: 'nombreSala',
                    emptyText: 'Selección Sala',
                    queryMode: 'local'
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Estado cama',
                    defaultType: 'radio',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {right: 15}
                    },
                    items: [{
                            boxLabel: 'Ocupada',
                            name: 'habilitada',
                            inputValue: 'true'
                        }, {
                            boxLabel: 'Desocupada',
                            name: 'habilitada',
                            inputValue: 'false'
                        }, {
                            boxLabel: 'Todos',
                            name: 'habilitada',
                            inputValue: '',
                            checked: true
                        }

                    ]
                }
            ]
        }],
    buttons: [{
            xtype: 'button',
            text: 'Buscar Camas',
            scale: 'medium',
            action: 'buscar',
            iconCls: 'buscar',
            buttonAlign: 'center'
        }, {
            text: 'Limpiar',
            scale: 'medium',
            iconCls: 'limpiar',
            handler: function(bot) {
                bot.up('panel').down('form').getForm().reset();
            }
        }]
});