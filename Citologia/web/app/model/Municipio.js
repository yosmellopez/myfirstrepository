Ext.define('Citologia.model.Municipio', {
    extend: 'Ext.data.Model',
    fields: ['idMunicipio', 'municipio', 'provincia', {name: 'objeto', persist: false}],
    idProperty: 'idMunicipio',
    belongsTo: {model: 'Citologia.model.Provincia', associationKey: 'provincia', getterName: 'getProvincia'},
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idMunicipio: this.raw.idMunicipio, municipio: this.raw.municipio, provincia: this.raw.provincia};
    }
});