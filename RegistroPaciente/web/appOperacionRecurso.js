Ext.application({
    name: 'Registro',
    controllers: ['OperacionRecursoControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridOperacionRecurso'
                        }]
                }]
        });
    }
});