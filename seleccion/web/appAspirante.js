Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['AspiranteController', 'DatosAspiranteController', 'ResumenExpController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'tabpanel',
                    title: 'Datos del Aspirante',
                    items: [{
                            title: 'Aspirante',
                            xtype: 'gridAspirante'
                        }, {
                            title: 'Datos Aspirante',
                            xtype: 'gridDatosAspirante'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridAspirante');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});
