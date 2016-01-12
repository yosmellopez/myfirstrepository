Ext.define('Registro.view.grupo.ModificarGrupo', {
    extend: 'Ext.window.Window',
    title: 'Modificar Grupo',
    alias: 'widget.modificarGrupo',
    width: 400,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('grupoform')];
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