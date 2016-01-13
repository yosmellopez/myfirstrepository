Ext.define('Seleccion.model.EntrevistaIndividual', {
    extend: 'Seleccion.model.Base',
    fields: ['idEntrevistaIndividual', 'fechaEntrevista', 'numExpediente', 'financiamiento', 'nombreMadre', 'nombrePadre', 'estatura', 'colorPiel', 'colorOjos', 'estadoCivil', 'numHijos', 'edadHijos', 'proficuo',
        {name: 'siSmg', type: 'boolean', defaultValue: false}, 'fechaSmg', {name: 'siInternacionalista', type: 'boolean', defaultValue: false}, {name: 'procedenciaMinint', type: 'boolean', defaultValue: false}, {name: 'procedenciaFar', type: 'boolean', defaultValue: false},
        'paisInternacionalista', 'senasVisibles', 'telefono', 'nombreEntrevistador', 'nivelEscolar', 'aspirante', 'convivencias', 'residencias', 'integracionesRevolucionarias', {name: 'objeto', persist: false}],
    idProperty: 'idEntrevistaIndividual',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idEntrevistaIndividual: datos.idEntrevistaIndividual, fechaEntrevista: datos.fechaEntrevista, numExpediente: datos.numExpediente, financiamiento: datos.financiamiento};
    },
    belongsTo: [{model: 'Aspirante', associationKey: 'aspirante', name: 'Aspirante'},
        {model: 'NivelEscolar', associationKey: 'nivelEscolar', name: 'NivelEscolar'}],
    hasMany: [{model: 'IntegracionRevolucionaria', name: 'integracionesRevolucionarias'}]
});

