var municipiosTodos = false;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['ProvinciaControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    tabBar: {
                        height: 30
                    },
                    header: {
                        xtype: 'header',
                        title: 'Lista de Provincias y Municipios',
                        height: 40
                    },
                    items: [{
                            xtype: 'gridProvincia',
                            tabConfig: {
                                height: 30
                            }
                        }, {
                            xtype: 'gridMunicipio',
                            tabConfig: {
                                height: 30
                            }
                        }]
                }]
        });
    }
});