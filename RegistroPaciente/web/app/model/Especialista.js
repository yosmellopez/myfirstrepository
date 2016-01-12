Ext.define('Registro.model.Especialista', {
    extend: 'Ext.data.Model',
    fields: ['idEspecialista', 'nombre', 'apellidos', 'grupo', 'especialidad','disponible'],
    idProperty: 'idEspecialista'
});