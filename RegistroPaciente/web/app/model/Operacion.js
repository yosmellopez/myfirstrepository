Ext.define('Registro.model.Operacion', {
    extend: 'Ext.data.Model',
    fields: ['idOperacion', 'paciente', 'grupo', 'especialidad', 'fechaOperacion','pacienteFallecido','cancerDetectado'],
    idProperty: 'idOperacion'
});