Ext.application({
    name: 'Registro',
    controllers: ['GrupoControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridGrupo'
                        }]
                }]
        });
    }
});