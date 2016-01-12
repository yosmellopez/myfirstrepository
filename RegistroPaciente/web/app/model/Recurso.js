Ext.define('Registro.model.Recurso', {
    extend: 'Ext.data.Model',
    fields: ['idRecurso', 'nombre', {name: 'cantidadRestante', type: 'int'}, {name: 'tarjetasEstibas', defaultValue: new Array()}],
    idProperty: 'idRecurso'
});