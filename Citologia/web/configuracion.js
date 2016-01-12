Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['ConfiguracionControl', 'ConsultorioControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    title: 'Configuraci\u00f3n',
                    items: [{
                            xtype: 'gridResponsableMuestra'
                        }, {
                            xtype: 'gridConsultorio'
                        }, {
                            xtype: 'gridAreaSalud'
                        }]
                }]
        });
    }
});