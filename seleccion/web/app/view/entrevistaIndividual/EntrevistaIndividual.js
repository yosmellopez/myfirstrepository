Ext.define('Seleccion.view.entrevistaIndividual.EntrevistaIndividual', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entrevistaIndividual',
    validarBoton: function () {
        console.log("OK");
        formulario = this.lookupReference('formulario');
        vm = this.getViewModel();
        valido = formulario.isValid();
        vm.setData({accion: 'insertar', iconoFinalizar: 'icon-arrow-right', botonValido: valido});
    }
});
