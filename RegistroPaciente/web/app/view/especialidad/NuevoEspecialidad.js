Ext.define('Registro.view.especialidad.NuevoEspecialidad', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoEspecialidad',
    initComponent: function () {
        this.items = [
            Ext.widget('especialidadform')
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