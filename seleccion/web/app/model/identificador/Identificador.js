Ext.define('Seleccion.model.identificador.Identificador', {
    extend: 'Ext.data.identifier.Generator',
    alias: 'data.identifier.custom',
    generate: function() {
        return null;
    }
});