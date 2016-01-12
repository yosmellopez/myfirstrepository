Ext.define('Registro.model.TarjetaEstiba', {
    extend: 'Ext.data.Model',
    fields: ['idTarjetaEstiba', 'recurso', 'fecha', 'operacion', {name: 'agrupar', persist: false}, {
            name: 'cantidad', type: 'int', convert: function (v, r) {
                return v *= r.get('operacion') ? 1 : r.get('operacion') === '' ? 1 : -1;
            }
        }],
    idProperty: 'idTarjetaEstiba'
});