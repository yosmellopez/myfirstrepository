Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['NivelEscolarController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Nivel Escolar',
                    items: [{
                            xtype: 'gridNivelEscolar'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridNivelEscolar');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});

