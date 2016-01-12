Ext.define('Registro.store.Causas', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'causas_id',
    pageSize: 20,
    model: 'Registro.model.Causa',
    proxy: {
        type: 'rest',
        url: 'causa.json',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            root: 'lista',
            rootProperty: 'lista',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});