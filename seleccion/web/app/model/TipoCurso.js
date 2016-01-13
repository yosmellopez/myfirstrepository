Ext.define('Seleccion.model.TipoCurso', {
    extend: 'Seleccion.model.Base',
    fields: ['idTipoCurso', 'tipoCurso', {name: 'objeto', persist: false}],
    idProperty: 'idTipoCurso',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idTipoCurso: datos.idTipoCurso, tipoCurso: datos.tipoCurso};
    }
});
