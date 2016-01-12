Ext.define('Registro.view.tipoOperacion.NuevoTipoOperacion', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoTipoOperacion',
    initComponent: function () {
        this.items = [
            Ext.widget('tipooperacionform')
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