Ext.define('Citologia.model.TarjetaPrueba', {
    extend: 'Ext.data.Model',
    fields: ['idTarjeta', 'paciente', 'antecedente', 'primeraCitologia', 'tipoCaso', 'nombre', {name: 'enfermedadesTransmisionSexual', defaultValue: new Array()}],
    idProperty: 'idTarjeta',
    associations: [{
            type: 'hasMany',
            model: 'Citologia.model.EnfermedadTransmisionSexual', name: 'enfermedadesTransmisionSexuales', associationKey: 'enfermedadesTransmisionSexual'
        }, {
            type: 'belongsTo',
            model: 'Citologia.model.DiagnosticoFinal', getterName: 'getDiagnostico', setterName: 'setDiagnostico', associationKey: 'primeraCitologia.diagnosticoFinal'
        }, {
            type: 'hasMany',
            model: 'Citologia.model.ResponsableMuestra', name: 'responsables', associationKey: 'primeraCitologia.responsablesMuestras'
        }, {
            type: 'belongsTo',
            model: 'Citologia.model.TipoCaso', associationKey: 'tipoCaso', getterName: 'getTipoCaso', setterName: 'setTipoCaso'
        }, {
            type: 'belongsTo',
            model: 'Citologia.model.TipoAnticonceptivo', associationKey: 'antecedente.tipoAnticonceptivo', getterName: 'getTipoAnticonceptivo', setterName: 'setTipoAnticonceptivo'
        }]
});