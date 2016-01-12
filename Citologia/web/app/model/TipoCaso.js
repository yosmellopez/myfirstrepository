Ext.define('Citologia.model.TipoCaso', {
    extend: 'Ext.data.Model',
    fields: ['idTipoCaso', 'tipoCaso', {name: 'objeto', persist: false}],
    idProperty: 'idTipoCaso',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idTipoCaso: this.raw.idTipoCaso, tipoCaso: this.raw.tipoCaso};
    }
});
