Ext.define('Registro.view.especialidad.ModificarEspecialidad', {
    extend: 'Ext.window.Window',
    title: 'Modificar Especialidad',
    alias: 'widget.modificarEspecialidad',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('especialidadform')];
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