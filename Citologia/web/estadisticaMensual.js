Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    views: ['estadistica.GridEstadisticaMensual'],
    stores: ['EstadisticasMensuales'],
    models: ['EstadisticaMensual'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridEstadisticaMensual'
                        }]
                }]
        });
    }
});