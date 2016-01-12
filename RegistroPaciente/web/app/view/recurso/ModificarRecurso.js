Ext.define('Registro.view.recurso.ModificarRecurso', {
    extend: 'Ext.window.Window',
    title: 'Modificar Recurso',
    alias: 'widget.modificarRecurso',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('recursoform')];
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