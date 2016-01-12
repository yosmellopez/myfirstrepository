Ext.define('Registro.view.tipoOperacion.ModificarTipoOperacion', {
    extend: 'Ext.window.Window',
    title: 'Modificar Tipo Operacion',
    alias: 'widget.modificarTipoOperacion',
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('tipooperacionform')];
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