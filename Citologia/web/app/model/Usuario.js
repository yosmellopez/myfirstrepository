Ext.define('Citologia.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: ['idUsuario', 'usuario', 'contrasenna', 'nombre', 'apellidos', 'rol', {name: 'eliminado', defaultValue: false}],
    idProperty: 'idUsuario'
});