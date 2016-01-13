Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['SolicitudController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Solicitud del Aspirante',
                    items: [{
                            xtype: 'gridSolicitud'
                        }]
                }]
       });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridSolicitud');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});
