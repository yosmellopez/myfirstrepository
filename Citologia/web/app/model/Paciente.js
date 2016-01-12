Ext.define('Citologia.model.Paciente', {
    extend: 'Ext.data.Model',
    fields: ['idPaciente', 'nombre', 'primerApellido', 'segundoApellido', 'ci', 'historiaClinica', {name: 'detencionPrecoz', type: 'boolean', defaultValue: false},
        'edad', 'consulta', 'consultorio', 'ocupacion', 'direccion', 'telefono', 'municipio'],
    idProperty: 'idPaciente'
});