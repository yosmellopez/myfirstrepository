Ext.define('Citologia.model.Consultorio', {
    extend: 'Ext.data.Model',
    fields: ['idConsultorio', 'nombre', 'areaSalud', {name: 'objeto', persist: false}],
    idProperty: 'idConsultorio',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idConsultorio: this.raw.idConsultorio, nombre: this.raw.nombre, areaSalud: this.raw.areaSalud};
    }
});
