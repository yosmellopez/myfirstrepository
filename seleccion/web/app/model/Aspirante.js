Ext.define('Seleccion.model.Aspirante', {
    extend: 'Seleccion.model.Base',
    fields: ['idAspirante', 'nombre', 'apellidos', 'ci', 'edad', 'datosAspirante', 'nombrePadre', 'nombreMadre', {name: 'sexo', type: 'boolean', defaultValue: true}, 'direccion', {name: 'objeto', persist: false}],
    idProperty: 'idAspirante',
    identifier: 'custom',
    constructor: function (datos) {
        this.callParent(arguments);
        datos.objeto = {idAspirante: datos.idAspirante, nombre: datos.nombre, apellidos: datos.apellidos, ci: datos.ci};
    }
});
