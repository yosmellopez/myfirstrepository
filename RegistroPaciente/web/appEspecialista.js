Ext.application({
    name: 'Registro',
    controllers: ['EspecialistaControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridEspecialista'
                        }]
                }]
        });
    }
});