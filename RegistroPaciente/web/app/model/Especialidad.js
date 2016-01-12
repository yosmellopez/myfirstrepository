Ext.define('Registro.model.Especialidad', {
    extend: 'Ext.data.Model',
    fields: ['idEspecialidad', 'especialidad', {name: 'objeto', persist: false}],
    idProperty: 'idEspecialidad',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idEspecialidad: this.raw.idEspecialidad, especialidad: this.raw.especialidad};
    }
});