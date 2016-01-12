Ext.define('Registro.view.usuario.ModificarUsuario', {
    extend: 'Ext.window.Window',
    title: 'Modificar Usuario',
    alias: 'widget.modificarUsuario',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('usuarioform')];
        this.buttons = [{
                text: 'Guardar',
                action: 'modificar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});