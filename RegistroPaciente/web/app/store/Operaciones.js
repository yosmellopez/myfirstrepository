Ext.define('Registro.store.Operaciones', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'operaciones_id',
    pageSize: 20,
    model: 'Registro.model.Operacion',
    proxy: {
        type: 'rest',
        url: 'operacion.json',
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