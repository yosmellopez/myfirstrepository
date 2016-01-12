Ext.define('Registro.view.operacion.NuevoOperacion', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoOperacion',
    initComponent: function () {
        this.items = [
            Ext.widget('operacionform')
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