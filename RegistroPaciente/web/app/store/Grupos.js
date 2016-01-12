Ext.define('Registro.store.Grupos', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'grupos_id',
    pageSize: 20,
    model: 'Registro.model.Grupo',
    proxy: {
        type: 'rest',
        url: 'grupo.json',
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