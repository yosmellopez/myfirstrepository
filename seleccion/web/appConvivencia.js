var loadConvivencia = false;
Ext.application({
    name: 'Selccion',
    appFolder: '../app',
    controllers: ['ConvivenciaController'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                xtype: 'panel',
                title: 'Convivencia',
                items: [{
                    xtype: 'gridConvivencia'
                }]
            }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridConvivencia');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});
