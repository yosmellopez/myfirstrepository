Ext.define('Registro.view.operacionRecurso.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.operacionRecursoform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
                name: 'cantidad',
                fieldLabel: 'Cantidad de Recursos'
            }];
        this.callParent(arguments);
    }
});