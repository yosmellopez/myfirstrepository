Ext.define('Registro.store.Especialistas', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'especialistas_id',
    pageSize: 20,
    model: 'Registro.model.Especialista',
    proxy: {
        type: 'rest',
        url: 'especialista.json',
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