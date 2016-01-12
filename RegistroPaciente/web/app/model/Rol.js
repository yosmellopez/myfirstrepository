Ext.define('Registro.model.Rol', {
    extend: 'Ext.data.Model',
    fields: ['idRol', 'rol', {name: 'objeto', persist: false}],
    idProperty: 'idRol',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idRol: this.raw.idRol, rol: this.raw.rol};
    }
});
