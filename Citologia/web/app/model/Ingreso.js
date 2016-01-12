Ext.define('Citologia.model.Ingreso', {
    extend: 'Ext.data.Model',
    fields: ['idIngreso', 'paciente', 'cama', 'fecha', 'diagnosticoProbable', 'meridiano',
        {name: 'agrupar', persist: false}],
    idProperty: 'idIngreso'
});