var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['ConsultorioControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    items: [{
                            xtype: 'gridConsultorio'
                        }, {
                            xtype: 'gridAreaSalud'
                        }]
                }]
        });
    }
});