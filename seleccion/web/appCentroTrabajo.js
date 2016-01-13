Ext.application({
    name: 'Seleccion', 
    appFolder: '../app',
    controllers: ['CentroTrabajoController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridCentroTrabajo',
                            id: 'gridCentroTrabajo',
                            expandido: false
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function (e) {
            gridUsuario = Ext.getCmp('gridCentroTrabajo');
            gridUsuario.animate({from: {width: gridUsuario.getWidth()}, to: {width: gridUsuario.getWidth() + (gridUsuario.expandido ? -160 : 160)}});
            gridUsuario.expandido = !gridUsuario.expandido;
        });
    }
});

