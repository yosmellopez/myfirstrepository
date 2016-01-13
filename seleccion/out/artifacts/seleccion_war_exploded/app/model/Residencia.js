Ext.define('Seleccion.model.Residencia', {
    extend: 'Ext.data.Model',
    fields: ['idResidencia', 'desde', 'hasta', 'direccion', {name: 'objeto', persist: false}],
    idProperty: 'idResidencia',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idResidencia: datos.idResidencia, desde: datos.desde, hasta: datos.hasta, direccion: datos.direccion};
    },
    actualizarObjeto: function () {
        this.get('objeto').idResidencia = this.get('idResidencia');
    }
});

