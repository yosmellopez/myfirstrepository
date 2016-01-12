Ext.application({
    name: 'Registro',
    controllers: ['RecursoControl', 'TarjetaEstibaControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'tabpanel',
                    items: [{
                            xtype: 'gridRecurso'
                        },{
                            xtype: 'gridTarjetaEstiba'
                        }]
                }]
        });
    }
});