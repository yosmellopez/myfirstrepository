Ext.define('Citologia.store.TiposCasos', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.TipoCaso',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'tipoCaso.json',
        reader: {
            type: 'json',
            root: 'lista'
        }
    }
});
