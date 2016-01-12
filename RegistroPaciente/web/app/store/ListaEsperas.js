Ext.define('Registro.store.ListaEsperas', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'listaEsperas_id',
    pageSize: 20,
    model: 'Registro.model.ListaEspera',
    proxy: {
        type: 'rest',
        url: 'listaEspera.json',
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