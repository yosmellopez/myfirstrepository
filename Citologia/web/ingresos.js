var registro = {};
var trasladoIngreso = true;
var municipiosTodos = true;
var todos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    controllers: ['PacienteControl', 'IngresoControlador'],
    launch: function () {
        Ext.create('Ext.container.Container', {
            renderTo: 'contenido',
            items: [{
                    xtype: 'tabpanel',
                    title: 'Lista de Pacientes e Ingresos',
                    items: [{
                            xtype: vista
                        }, {
                            xtype: 'aliasgridingresos'
                        }]
                }]
        });
    }
});