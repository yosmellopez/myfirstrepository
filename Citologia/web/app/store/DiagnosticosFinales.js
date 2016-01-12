Ext.define('Citologia.store.DiagnosticosFinales', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.DiagnosticoFinal',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'diagnosticoFinal.json',
        reader: {
            type: 'json',
            root: 'lista'
        }
    }
});
