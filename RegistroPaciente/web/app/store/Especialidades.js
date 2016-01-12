Ext.define('Registro.store.Especialidades', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'especialidades_id',
    pageSize: 20,
    model: 'Registro.model.Especialidad',
    proxy: {
        type: 'rest',
        url: 'especialidad.json',
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