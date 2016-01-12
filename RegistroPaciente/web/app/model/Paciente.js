Ext.define('Registro.model.Paciente', {
    extend: 'Ext.data.Model',
    fields: ['idPaciente', 'historiaClinica', 'ci', 'nombre', 'apellidos', 'direccionParticular', 'telefono', 'diagnostico', 'fechaEntrada', 'fechaProbableOperacion', 'patologiaTumoral', 'grupoFactor', 'fechaRegistroBaja', 'comentarioObservaciones', 'areaSalud', 'especialidad', 'listaEspera', 'causaBaja','sexo','fallecido'],
    idProperty: 'idPaciente'
});