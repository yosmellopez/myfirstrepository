Ext.define('Seleccion.model.Observacion', {
    extend: 'Seleccion.model.Base',
    fields: ['idObservacion', 'fechaPresentacion', 'fechaBaja', 'motivoBaja', {name: 'objeto', persist: false}],
    idProperty: 'idObservacion',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idObservacion: datos.idObservacion, fechaPresentacion: datos.fechaPresentacion, fechaBaja: datos.fechaBaja, motivoBaja: datos.motivoBaja};
    }
});



