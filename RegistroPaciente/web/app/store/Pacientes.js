Ext.define('Registro.store.Pacientes', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'pacientes_id',
    pageSize: 20,
    model: 'Registro.model.Paciente',
    proxy: {
        type: 'rest',
        url: 'paciente.json',
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