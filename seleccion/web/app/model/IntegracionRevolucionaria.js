Ext.define('Seleccion.model.IntegracionRevolucionaria', {
    extend: 'Seleccion.model.Base',
    fields: ['idIntegracionRevolucionaria', 'integracionRevolucionaria', 'siglas', {name: 'objeto', persist: false}],
    idProperty: 'idIntegracionRevolucionaria',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idIntegracionRevolucioanaria: datos.idIntegracionRevolucioanaria, integracionRevolucionaria: datos.integracionRevolucionaria, siglas: datos.siglas};
    }
});

