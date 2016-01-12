Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    views: ['estadistica.GridPatologiaCuelloGrupoEdad', 'estadistica.ChartPromedioEdad'],
    stores: ['PatologiasCuelloGrupoEdades'],
    models: ['PatologiaCuelloGrupoEdad'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridPatologiaCuelloGrupoEdad'
                        }]
                }, {
                    xtype: 'panel',
                    items: [{
                            flex: 1,
                            xtype: 'container',
                            layout: {type: 'vbox', align: 'stretch'},
                            items: [{region: 'center', xtype: 'chartPromedioEdad'}]
                        }]
                }]
        });
    }
});