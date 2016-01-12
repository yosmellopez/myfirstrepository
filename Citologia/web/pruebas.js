var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['TarjetaPruebaControl', 'PacienteControl'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    title: 'Lista de Pacientes y Pruebas Realizadas',
                    items: [{
                            xtype: 'gridPaciente',
                            title: 'Lista de Pacientes'
                        }, {
                            xtype: 'gridTarjetaPrueba'
                        }]
                }]
        });
    }
});