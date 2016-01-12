Ext.define('Registro.model.ListaEspera', {
    extend: 'Ext.data.Model',
    fields: ['idListaEspera', 'nombreLista', 'prioridad', {name: 'objeto', persist: false}],
    idProperty: 'idListaEspera',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idListaEspera: this.raw.idListaEspera, nombreLista: this.raw.nombreLista};
    }
});