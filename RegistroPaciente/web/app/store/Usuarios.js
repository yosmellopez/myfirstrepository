Ext.define('Registro.store.Usuarios', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'usuarios_id',
    pageSize: 20,
    model: 'Registro.model.Usuario',
    proxy: {
        type: 'rest',
        url: 'usuario.json',
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