Ext.define('Citologia.model.ResponsableMuestra', {
    extend: 'Ext.data.Model',
    fields: ['idResponsableMuestra', 'nombre', 'apellidos', {name: 'objeto', persist: false}],
    idProperty: 'idResponsableMuestra',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idResponsableMuestra: this.raw.idResponsableMuestra, nombre: this.raw.nombre, apellidos: this.raw.apellidos};
    }
});
