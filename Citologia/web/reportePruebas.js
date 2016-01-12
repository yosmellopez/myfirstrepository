var municipiosTodos = true;
Ext.application({
    name: 'Citologia',
    appFolder: '../app',
    views: ['tarjetaPrueba.GridTarjetaPruebaReporte', 'tarjetaPrueba.BusquedaTarjetaPrueba'],
    stores: ['TarjetasPruebas', 'Pacientes', 'TiposAnticonceptivos', 'EnfermedadesTransmisionSexual', 'DiagnosticosFinales', 'TiposCasos', 'ResponsablesMuestra'],
    models: ['TarjetaPrueba', 'Paciente', 'TipoAnticonceptivo', 'EnfermedadTransmisionSexual', 'DiagnosticoFinal', 'TipoCaso', 'ResponsableMuestra'],
    launch: function () {
        this.control({
            'busquedaTarjetaPrueba button[action=buscar]': {
                click: this.buscar
            }
        });
        Ext.create('Ext.container.Container', {
            layout: 'fit',
            renderTo: 'contenido',
            items: [{
                    xtype: 'gridTarjetaPruebaReporte'
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