Ext.define('Citologia.view.sala.BuscarSala', {
    extend: 'Ext.panel.Panel',
    title: '<i class="fa fa-search-plus"></i>Buscar Sala',
    collapsible: true,
    split: true,
    collapsed: true,
    titleCollapse: true,
    frame: true,
    alias: 'widget.busquedassala',
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
                    xtype: 'textfield',
                    name: 'nombreSala',
                    fieldLabel: 'Nombre',
                    hideTrigger: true
                }]
        }],
    buttons: [{
            xtype: 'button',
            text: 'Buscar Salas',
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
        }]
});