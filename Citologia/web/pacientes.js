var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['PacienteControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'gridPaciente'
                }]
        });
    }
});