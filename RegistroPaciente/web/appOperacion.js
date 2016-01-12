Ext.application({
    name: 'Registro',
    controllers: ['PacienteControl', 'OperacionControl', 'TipoOperacionControl'],
    requires: ['Registro.plugins.GridSelector','Registro.store.TipoOperacionRecursos'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'centro',
            items: [{
                    xtype: 'tabpanel',
                    items: [{
                            xtype: 'gridPaciente'
                        }, {
                            xtype: 'gridOperacion'
                        }, {
                            xtype: 'gridTipoOperacion'
                        }]
                }]
        });
    }
});