Ext.define('Citologia.model.PatologiaCuelloGrupoEdad', {
    extend: 'Ext.data.Model',
    fields: ['id', 'rangoEdad', 'negativo', 'inflamatorio', 'nicI', 'nicII', 'nicIII', 'carsinoma'],
    idProperty: 'id'
});
