Ext.define('Registro.view.paciente.NuevoPaciente', {
    extend: 'Ext.window.Window',
    title: 'Añadir registro',
    layout: 'fit',
    modal: true,
    alias: 'widget.nuevoPaciente',
    initComponent: function () {
        this.items = [
            Ext.widget('pacienteform')
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