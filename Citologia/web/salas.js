var todos = false;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['SalaControlador', 'CamaControlador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    items: [{
                            xtype: 'aliasgridsalas'
                        }, {
                            xtype: 'aliasgridcamas'
                        }
                    ]
                }]
        });
    }
});