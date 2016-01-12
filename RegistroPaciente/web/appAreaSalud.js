Ext.application({
    name: 'Registro',
    controllers: ['AreaSaludControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridAreaSalud'
                        }]
                }]
        });
    }
});