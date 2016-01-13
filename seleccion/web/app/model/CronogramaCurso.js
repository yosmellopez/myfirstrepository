Ext.define('Seleccion.model.CronogramaCurso', {
    extend: 'Seleccion.model.Base',
    fields: ['idCronogramaCurso', 'lugar', 'capacidad', 'tipoCurso', 'fechaInicio', 'fechaFin', 'aspirantes', {name: 'objeto', persist: false}],
    idProperty: 'idCronogramaCurso',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idCronogramaCurso: datos.idCronogramaCurso, lugar: datos.lugar, capacidad: datos.capacidad, fechaInicio: datos.fechaInicio, fechaFin: datos.fechaFin};
    },
    belongsTo: {
        model: 'TipoCurso', associationKey: 'tipoCurso', name: 'TipoCurso'
    },
    hasMany: {
        model: 'Aspirante', name: 'aspirantes'
    }
});



