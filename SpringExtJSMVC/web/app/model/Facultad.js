Ext.define('CRUD.model.Facultad', {
    extend: 'Ext.data.Model', 
    fields: ['idFacultad', 'nombre', 'siglas', 'sede', {name: 'objeto', persist: false}], 
    idProperty: 'idFacultad',
    identifier: 'custom'
});