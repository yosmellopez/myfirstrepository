Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['ControlAspiranteController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        cont = Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Control del Aspirante',
                    items: [{
                            xtype: 'gridControlAspirante'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = cont.down('panel');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});
