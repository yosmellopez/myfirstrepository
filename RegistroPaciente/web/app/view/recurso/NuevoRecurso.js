Ext.define('Registro.view.recurso.NuevoRecurso', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoRecurso',
    initComponent: function () {
        this.items = [
            Ext.widget('recursoform')
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