Ext.define('Seleccion.model.ResumenExp', {
    extend: 'Ext.data.Model',
    fields: ['idResumenExpediente', 'ciudad', 'aspirante', 'fecha', 'nombreDirector', 'apodo', 'telefono', 'trayLaboral', 'trayEstudiantil', 'trayRevolucionaria', 'chequeoMedico', 'antecPenal', 'conclusiones', 'elaborador', 'fechaElaborado', {name: 'objeto', persist: false}],
    idProperty: 'idResumenExpediente',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idAspirante: datos.idAspirante, ciudad: datos.ciudad, fecha: datos.fecha, nombreDirector: datos.nombreDirector};
    }
});

