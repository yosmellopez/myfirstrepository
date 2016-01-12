Ext.define('Registro.model.TipoOperacionRecurso', {
    extend: 'Ext.data.Model',
    fields: ['tipoOperacionRecursoPK', 'recurso', 'tipoRecurso', 'cantidad'],
    idProperty: 'tipoOperacionRecursoPK'
});