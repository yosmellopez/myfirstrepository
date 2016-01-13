Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    views: ['estadistica.GridEstadisticaMensual', 'estadistica.ChartEstadisticaMensual'],
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
                        }, {
                            xtype: 'panel',
                            items: [{
                                    flex: 1,
                                    xtype: 'container',
                                    layout: {type: 'vbox', align: 'stretch'},
                                    items: [{region: 'center', xtype: 'chartEstadisticaMensual'}]
                                }]
                        }]
                }]
        });
    }
});