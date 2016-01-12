Ext.define('Registro.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: ['idUsuario', 'usuario', 'contrasena', 'nombre', 'apellidos', 'rol'],
    idProperty: 'idUsuario'
});