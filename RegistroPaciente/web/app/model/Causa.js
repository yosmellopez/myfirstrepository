Ext.define('Registro.model.Causa', {
    extend: 'Ext.data.Model',
    fields: ['idCausa', 'causa', {name: 'objeto', persist: false}],
    idProperty: 'idCausa',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idCausa: this.raw.idCausa, causa: this.raw.causa};
    }
});