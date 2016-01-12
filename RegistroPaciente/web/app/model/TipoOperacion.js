Ext.define('Registro.model.TipoOperacion', {
    extend: 'Ext.data.Model',
    fields: ['idTipoOperacion', 'tipo', 'tipoOperacionRecursos'],
    idProperty: 'idTipoOperacion',
    hasMany: [{
            type: 'hasMany', model: 'Registro.model.Registro', associationKey: 'tipoOperacionRecursos', name: 'tipoOperacionRecursos'
        }]
});