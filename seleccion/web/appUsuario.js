Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['UsuarioController'],
    requires: ['Seleccion.model.identificador.Identificador', 'Seleccion.view.usuario.PasswordVType'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridusuario',
                            id: 'gridusuario',
                            expandido: false
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function (e) {
            gridUsuario = Ext.getCmp('gridusuario');
            gridUsuario.animate({from: {width: gridUsuario.getWidth()}, to: {width: gridUsuario.getWidth() + (gridUsuario.expandido ? -160 : 160)}});
            gridUsuario.expandido = !gridUsuario.expandido;
        });
    }
});
