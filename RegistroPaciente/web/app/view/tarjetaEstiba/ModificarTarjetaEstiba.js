Ext.define('Registro.view.tarjetaEstiba.ModificarTarjetaEstiba', {
    extend: 'Ext.window.Window',
    title: 'Modificar TarjetaEstiba',
    alias: 'widget.modificarTarjetaEstiba',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('tarjetaEstibaform')];
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