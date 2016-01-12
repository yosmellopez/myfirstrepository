Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['UsuarioControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'gridUsuario'
                }]
        });
    }
});