Ext.define('Seleccion.view.usuario.PasswordVType', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.password',
    validateField: function (field) {
        field.next().validate();
    }
});
