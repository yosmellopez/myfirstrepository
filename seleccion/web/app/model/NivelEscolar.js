Ext.define('Seleccion.model.NivelEscolar', {
    extend: 'Seleccion.model.Base',
    fields: ['idNivelEscolar', 'nivelEscolar', {name: 'objeto', persist: false}],
    idProperty: 'idNivelEscolar',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idNivelEscolar: datos.idNivelEscolar, nivelEscolar: datos.nivelEscolar};
    }
});
