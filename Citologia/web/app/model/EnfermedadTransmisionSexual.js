Ext.define('Citologia.model.EnfermedadTransmisionSexual', {
    extend: 'Ext.data.Model',
    fields: ['idEnfermedadTransmisionSexual', 'enfermedad', {name: 'objeto', persist: false}],
    idProperty: 'idEnfermedadTransmisionSexual',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idEnfermedadTransmisionSexual: this.raw.idEnfermedadTransmisionSexual, enfermedad: this.raw.enfermedad};
    }
});
