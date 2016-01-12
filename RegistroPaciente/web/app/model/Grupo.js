Ext.define('Registro.model.Grupo', {
    extend: 'Ext.data.Model',
    fields: ['idGrupo', 'grupo', {name: 'objeto', persist: false}],
    idProperty: 'idGrupo',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idGrupo: this.raw.idGrupo, grupo: this.raw.grupo};
    }
});