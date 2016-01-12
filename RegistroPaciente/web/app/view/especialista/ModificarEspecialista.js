Ext.define('Registro.view.especialista.ModificarEspecialista', {
    extend: 'Ext.window.Window',
    title: 'Modificar Especialista',
    alias: 'widget.modificarEspecialista',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('especialistaform')];
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