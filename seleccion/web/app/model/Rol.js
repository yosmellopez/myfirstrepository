Ext.define('Seleccion.model.Rol', {
    extend: 'Ext.data.Model',
    fields: ['idRol', 'rol', {name: 'objeto', persist: false}],
    idProperty: 'idRol',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idRol: datos.idRol, rol: datos.rol};
    }
});
