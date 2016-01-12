Ext.define('CRUD.model.Departamento', {
    extend: 'Ext.data.Model',
    fields: ['idDepartamento', 'nombre', 'facultad', {name: 'objeto', persist: false}],
    idProperty: 'idDepartamento', 
    identifier: 'custom'
});