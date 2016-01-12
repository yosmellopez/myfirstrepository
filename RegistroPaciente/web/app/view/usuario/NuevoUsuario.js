Ext.define('Registro.view.usuario.NuevoUsuario', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoUsuario',
    initComponent: function () {
        this.items = [
            Ext.widget('usuarioform')
        ];
        this.buttons = [{
                text: 'Guardar',
                action: 'insertar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }


});