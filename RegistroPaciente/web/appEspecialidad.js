Ext.application({
    name: 'Registro',
    controllers: ['EspecialidadControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridEspecialidad'
                        }]
                }]
        });
    }
});