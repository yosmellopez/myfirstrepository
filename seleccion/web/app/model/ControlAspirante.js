Ext.define('Seleccion.model.ControlAspirante', {
    extend: 'Seleccion.model.Base',
    fields: ['idControlAspirante', 'expProceso', 'aspirante', 'expCulminado', 'aprobadoMinint', 'observacion', {name: 'objeto', persist: false}],
    idProperty: 'idControlAspirante',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idAspirante: datos.idAspirante, expProceso: datos.expProceso, expCulminado: datos.expCulminado, aprobMinint: datos.aprobMinint, aspirante: datos.aspirante};
    },
    belongsTo: [{
            model: 'Aspirante', associationKey: 'aspirante', name: 'Aspirante'
        }, {
            model: 'Observacion', associationKey: 'observacion', name: 'Observacion'
        }]
});

