Ext.define('Seleccion.model.DatosAspirante', {
    extend: 'Ext.data.Model',
    fields: ['idDatosAspirante', 'antecedenteFamiliar', 'antecedentePatologico', 'antecedentePenal', 'antecedentePenal', 'numHijos', 'problemaFamiliar', 'personasConvivencia', 'aspirante'],
    idProperty: 'idDatosAspirante',
    identifier: 'custom'
});


