Ext.define('Registro.store.Recursos', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'recursos_id',
    pageSize: 20,
    model: 'Registro.model.Recurso',
    proxy: {
        type: 'rest',
        url: 'recurso.json',
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