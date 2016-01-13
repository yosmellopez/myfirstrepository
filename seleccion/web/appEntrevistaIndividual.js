var loadConvivencia = false;
Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['EntrevistaIndividualController', 'ConvivenciaController', 'ResidenciaController'],
    requires: ['Seleccion.model.identificador.Identificador', 'Seleccion.view.entrevistaIndividual.EntrevistaIndividual', 'Seleccion.plugins.GridSelector'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Entrevista Individual',
                    items: [{
                            xtype: 'gridEntrevistaIndividual'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridEntrevistaIndividual');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});
