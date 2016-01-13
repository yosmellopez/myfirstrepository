Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['ResumenExpController'],
    requires: ['Seleccion.model.identificador.Identificador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Resumen de  Expediente',
                    items: [{
                            xtype: 'gridResumenExp'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridResumenExp');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});


