Ext.define('Seleccion.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: ['idUsuario', 'usuario', 'nombre', 'rol', 'contrasena', 'apellidos', {name: 'objeto', persist: false}],
    idProperty: 'idUsuario',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
//        datos.objeto = {idUsuario: datos.idUsuario, usuario: datos.usuario, nombre: datos.nombre, rol: datos.rol, apellidos: datos.apellidos};
    },
    schema: {
        namespace: 'Seleccion.model'
    },
    belongsTo: {
        model: 'Rol', associationKey: 'rol', name: 'Rol'
    }
});
