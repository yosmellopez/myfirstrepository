Ext.define('Registro.store.TipoOperacionRecursos', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'operacionRecursos_id',
    pageSize: 20,
    model: 'Registro.model.TipoOperacionRecurso',
    proxy: {
        type: 'rest',
        url: 'operacionRecurso.json',
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