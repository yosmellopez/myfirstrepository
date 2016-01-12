Ext.application({
    name: 'Registro',
    controllers: ['PacienteControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'panel',
                    items: [{
                            xtype: 'gridPaciente'
                        }]
                }]
        });
    }
});