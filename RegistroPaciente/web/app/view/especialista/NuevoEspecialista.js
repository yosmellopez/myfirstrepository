Ext.define('Registro.view.especialista.NuevoEspecialista', {
    extend: 'Ext.window.Window',
    title: 'Añadir especialista',
    width: 400,
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoEspecialista',
    initComponent: function () {
        this.items = [
            Ext.widget('especialistaform')
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