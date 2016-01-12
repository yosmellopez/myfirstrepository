Ext.define('CRUD.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: ['idUsuario', 'usuario', 'nombre', 'rol', 'contrasena', 'apellidos', 'fechaAcceso', 'ci', 'departamento', {name: 'cursos', defaultValue: new Array()}],
    idProperty: 'idUsuario',
    associations: [{
            type: 'belongsTo', model: 'CRUD.model.Rol', associationKey: 'rol', getterName: 'getRol', setterName: 'setRol'
        }, {
            type: 'hasMany', model: 'CRUD.model.Curso', associationKey: 'cursos', name: 'cursos', storeConfig: {
            }
        }]
});
