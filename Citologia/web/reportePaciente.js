var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    stores: ['Pacientes', 'Consultorios', 'AreasSalud', 'Provincias', 'Municipios'],
    models: ['Paciente', 'Consultorio', 'AreaSalud', 'Provincia', 'Municipio'],
    views: ['paciente.GridPacienteReporte', 'paciente.BusquedaPaciente'],
    launch: function () {
        this.control({
            'busquedaPaciente button[action=buscar]': {
                click: this.buscar
            }
        });
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'gridPacienteReporte'
                }]
        });
    },
    buscar: function (bot) {
        form = bot.up('form');
        valores = form.getValues();
        grid = form.up('grid');
        st = grid.getStore();
        st.load({
            params: {parametros: Ext.encode(valores)}
        });
    }
});