Ext.define('Registro.model.TipoOperacion', {
    extend: 'Ext.data.Model',
    fields: ['idTipoOperacion', 'tipo', 'tipoOperacionRecursos', {name: 'objeto', persist: false}],
    idProperty: 'idTipoOperacion',
    hasMany: [{
            type: 'hasMany', model: 'Registro.model.TipoOperacionRecurso', associationKey: 'tipoOperacionRecursos', name: 'tipoOperacionRecursos'
        }],
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idTipoOperacion: this.raw.idTipoOperacion, tipo: this.raw.tipo};
    }
});