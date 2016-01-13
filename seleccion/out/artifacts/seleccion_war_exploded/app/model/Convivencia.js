Ext.define('Seleccion.model.Convivencia', {
    extend: 'Ext.data.Model',
    fields: ['idConvivencia', 'nombreApellidos', 'edad', 'parentesco', 'centroTrabajoEscuela', {name: 'objeto', persist: false}],
    idProperty: 'idConvivencia',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idConvivencia: datos.idConvivencia, nombreApellidos: datos.nombreApellidos, edad: datos.edad, parentesco: datos.parentesco, centroTrabajoEscuela: datos.centroTrabajoEscuela};
    }
});



