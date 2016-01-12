Ext.define('Citologia.model.PrimeraCitologia', {
    extend: 'Ext.data.Model',
    fields: ['idPrimeraCitologia', 'fechaTomaMuestra', 'fechaResultadoFinal', 'diagnosticoFinal',
        {name: 'responsablesMuestras', defaultValue: new Array()}],
    idProperty: 'idPrimeraCitologia',
    constructor: function () {
        this.callParent(arguments);
        this.raw.objeto = {idPrimeraCitologia: this.raw.idPrimeraCitologia, fechaTomaMuestra: this.raw.fechaTomaMuestra,
            fechaResultadoFinal: this.raw.fechaResultadoFinal, diagnosticoFinal: this.raw.diagnosticoFinal};
    }
});
