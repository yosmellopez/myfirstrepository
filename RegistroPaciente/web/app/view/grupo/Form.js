Ext.define('Registro.view.grupo.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.grupoform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {

        this.items = [{
            name: 'grupo',
            fieldLabel: 'Nombre del Grupo',
            vtype:'vacio'
        }];
        this.callParent(arguments);
    }
});