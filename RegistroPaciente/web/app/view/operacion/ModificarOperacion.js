Ext.define('Registro.view.operacion.ModificarOperacion', {
    extend: 'Ext.window.Window',
    title: 'Modificar Operacion',
    alias: 'widget.modificarOperacion',
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('operacionform')];
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