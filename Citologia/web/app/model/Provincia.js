Ext.define('Citologia.model.Provincia', {
    extend: 'Ext.data.Model',
    fields: ['idProvincia', 'provincia', {name: 'objeto', persist: false}],
    idProperty: 'idProvincia',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idProvincia: this.raw.idProvincia, provincia: this.raw.provincia};
    }
});
