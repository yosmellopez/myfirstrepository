Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['ObservacionController'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Observacion',
                    items: [{
                            xtype: 'gridObservacion'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridObservacion');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});

