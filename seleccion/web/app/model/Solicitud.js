Ext.define('Seleccion.model.Solicitud', {
    extend: 'Ext.data.Model',
    fields: ['idSolicitud', 'causaSolicitud', 'fechaSolicitud', 'aspirante'],
    idProperty: 'idSolicitud',
    identifier: 'custom'
});


