Ext.application({
    name: 'Registro',
    controllers: ['TarjetaEstibaControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridTarjetaEstiba'
                        }]
                }]
        });
    }
});