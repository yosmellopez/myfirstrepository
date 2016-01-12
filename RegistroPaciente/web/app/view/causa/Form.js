Ext.define('Registro.view.causa.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.causaform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {

        this.items = [            {
            name: 'causa',
            fieldLabel: 'Nombre de Causa',
            vtype:'vacio'
        }];
        this.callParent(arguments);
    }
});