Ext.define('Citologia.model.TipoAnticonceptivo', {
    extend: 'Ext.data.Model',
    fields: ['idTipoAnticonceptivo', 'nombreAnticonceptivo', {name: 'oral', type: 'boolean', defaultValue: false}, {name: 'objeto', persist: false}],
    idProperty: 'idTipoAnticonceptivo',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idTipoAnticonceptivo: this.raw.idTipoAnticonceptivo, nombreAnticonceptivo: this.raw.nombreAnticonceptivo, oral: this.raw.oral};
    }
});