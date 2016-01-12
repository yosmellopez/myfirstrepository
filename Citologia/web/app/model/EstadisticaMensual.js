Ext.define('Citologia.model.EstadisticaMensual', {
    extend: 'Ext.data.Model',
    fields: ['idEstadistica', 'area', 'negativo', 'noUtil', 'infectadas', 'total'],
    idProperty: 'idEstadistica'
});
