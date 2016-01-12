Ext.define('Citologia.store.AreasSalud', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.AreaSalud',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: 'areaSalud.json',
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'lista'
        },
        writer: {
            type: 'json'
        }
    }
});