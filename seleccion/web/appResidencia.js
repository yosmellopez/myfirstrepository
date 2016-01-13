Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['ResidenciaController'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Residencia',
                    items: [{
                            xtype: 'gridResidencia'
                        }]
                }]
         });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridResidencia');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});

