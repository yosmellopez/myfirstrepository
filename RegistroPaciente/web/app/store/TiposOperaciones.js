Ext.define('Registro.store.TiposOperaciones', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'operaciones_id',
    pageSize: 20,
    model: 'Registro.model.TipoOperacion',
    proxy: {
        type: 'rest',
        url: 'tipoOperacion.json',
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