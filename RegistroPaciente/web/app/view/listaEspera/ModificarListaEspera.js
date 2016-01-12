Ext.define('Registro.view.listaEspera.ModificarListaEspera', {
    extend: 'Ext.window.Window',
    title: 'Modificar ListaEspera',
    alias: 'widget.modificarListaEspera',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('listaEsperaform')];
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