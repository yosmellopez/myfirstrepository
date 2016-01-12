Ext.define('Registro.view.paciente.ModificarPaciente', {
    extend: 'Ext.window.Window',
    title: 'Modificar Paciente',
    alias: 'widget.modificarPaciente',
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [Ext.widget('pacienteform')];
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