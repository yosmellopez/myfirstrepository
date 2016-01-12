Ext.define('Registro.store.TarjetaEstibas', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'tarjetaEstibas_id',
    pageSize: 20,
    groupField: 'agrupar',
    model: 'Registro.model.TarjetaEstiba',
    proxy: {
        type: 'rest',
        url: 'tarjetaEstiba.json',
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