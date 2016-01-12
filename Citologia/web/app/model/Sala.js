Ext.define('Citologia.model.Sala', {
    extend: 'Ext.data.Model',
    fields: ['idSala', 'nombreSala', 'camaReal', {name: 'csala', persist: false}],
    idProperty: 'idSala',
    constructor: function () {
        this.callParent(arguments);
        this.raw.csala = {idSala: this.raw.idSala, nombreSala: this.raw.nombreSala, camaReal: this.raw.camaReal};
    }
});

