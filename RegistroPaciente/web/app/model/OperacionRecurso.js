Ext.define('Registro.model.OperacionRecurso', {
    extend: 'Ext.data.Model',
    fields: ['idOperacion', 'idRecurso', 'cantidad'],
    idProperty: 'idOperacion'
});