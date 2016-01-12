Ext.define('Citologia.model.Cama', {
    extend: 'Ext.data.Model',
    fields: ['idCama', 'numeroCama', {name: 'habilitada', type: 'boolean', defaultValue: false}, 'sala', {name: 'nCama', persist: false}],
    idProperty: 'idCama',
    constructor: function() {
        this.callParent(arguments);
        this.raw.nCama = {idCama: this.raw.idCama, numeroCama: this.raw.numeroCama, habilitada: this.raw.habilitada, sala: this.raw.sala};
    }
});

