Ext.define('Registro.model.AreaSalud', {
    extend: 'Ext.data.Model',
    fields: ['idAreaSalud', 'nombre', 'direccion', {name: 'objeto', persist: false}],
    idProperty: 'idAreaSalud',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idAreaSalud: this.raw.idAreaSalud, nombre: this.raw.nombre, direccion: this.raw.direccion};
    }
});
