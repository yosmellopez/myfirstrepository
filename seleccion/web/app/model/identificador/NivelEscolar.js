Ext.define('Seleccion.model.NivelEscolar', {
    extend: 'Ext.data.Model',
    fields: ['idNEscolar', 'nivelEscolar',{name: 'objeto', persist: false}],
    idProperty: 'idNEscolar',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idNEscolar: datos.idNEscolar, ivelEscolar: datos.ivelEscolar, campoII: datos.campoII, campoIII: datos.campoIII};
    }
});
