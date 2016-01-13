Ext.define('Seleccion.model.CentroTrabajo', {
    extend: 'Ext.data.Model',
    fields: ['idCentroTrabajo', 'nombre',  {name: 'objeto', persist: false}],
    idProperty: 'idCentroTrabajo',
    identifier: 'custom',
    constructor: function (data) {
        this.callParent(arguments);
        data.objeto = {idCentroTrabajo: data.idCentroTrabajo, nombre: data.nombre};
    }
});



