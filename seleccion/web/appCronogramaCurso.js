Ext.application({
    name: 'Seleccion',
    appFolder: '../app',
    controllers: ['CronogramaCursoController'],
    requires: ['Seleccion.model.identificador.Identificador', 'Seleccion.plugins.GridSelector', 'Seleccion.plugins.SubTable'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    title: 'Cronograma de Curso',
                    items: [{
                            id: 'gridCronogramaCurso',
                            xtype: 'gridCronogramaCurso'
                        }]
                }]
        });
        var element = Ext.get('expandido');
        element.on('click', function () {
            gridUsuario = Ext.getCmp('gridCronogramaCurso');
            gridUsuario.animate({keyframes: {'0%': {width: 800}, '100%': {width: '100%'}}});
        });
    }
});

