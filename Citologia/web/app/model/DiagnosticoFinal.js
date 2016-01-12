Ext.define('Citologia.model.DiagnosticoFinal', {
    extend: 'Ext.data.Model',
    fields: ['idDiagnosticoFinal', 'diagnosticoFinal', {name: 'objeto', persist: false}],
    idProperty: 'idDiagnosticoFinal',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idDiagnosticoFinal: this.raw.idDiagnosticoFinal, diagnosticoFinal: this.raw.diagnosticoFinal};
    }
});
