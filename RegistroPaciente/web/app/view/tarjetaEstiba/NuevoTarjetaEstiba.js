Ext.define('Registro.view.tarjetaEstiba.NuevoTarjetaEstiba', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoTarjetaEstiba',
    initComponent: function () {
        this.items = [
            Ext.widget('tarjetaEstibaform')
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