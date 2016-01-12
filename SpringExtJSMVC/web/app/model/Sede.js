Ext.define('CRUD.model.Sede', {
    extend: 'Ext.data.Model',
    fields: ['idSede', 'nombre', {name: 'objeto', persist: false}],
    idProperty: 'idSede'
});