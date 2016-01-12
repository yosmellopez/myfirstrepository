Ext.define('Registro.store.Roles', {
    extend: 'Ext.data.Store',
    model: 'Registro.model.Rol',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'rol.json',
        reader: {
            type: 'json',
            rootProperty: 'lista',
            root: 'lista'
        }
    }
});

