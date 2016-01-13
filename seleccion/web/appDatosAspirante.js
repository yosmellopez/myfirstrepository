Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['DatosAspiranteController'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Datos del Aspirante',
                    items: [{
                            xtype: 'gridDatosAspirante'
                        }]
                }]
         });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridDatosAspirante');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});


