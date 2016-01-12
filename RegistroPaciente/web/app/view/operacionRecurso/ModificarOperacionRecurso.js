Ext.define('Registro.view.operacionRecurso.ModificarOperacionRecurso', {
    extend: 'Ext.window.Window',
    title: 'Modificar OperacionRecurso',
    alias: 'widget.modificarOperacionRecurso',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('operacionRecursoform')];
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