var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['ConfiguracionControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'gridResponsableMuestra'
                }]
        });
    }
});