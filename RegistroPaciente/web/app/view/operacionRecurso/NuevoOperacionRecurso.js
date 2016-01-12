Ext.define('Registro.view.operacionRecurso.NuevoOperacionRecurso', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoOperacionRecurso',
    initComponent: function () {
        this.items = [
            Ext.widget('operacionRecursoform')
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