Ext.define('Registro.view.causa.ModificarCausa', {
    extend: 'Ext.window.Window',
    title: 'Modificar Causa',
    alias: 'widget.modificarCausa',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('causaform')];
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