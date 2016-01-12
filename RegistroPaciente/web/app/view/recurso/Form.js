Ext.define('Registro.view.recurso.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.recursoform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
                xtype: 'combo',
                name: 'nombre',
                fieldLabel: 'Nombre del Recurso',
                store: 'Recursos',
                queryMode: 'local',
                valueField: 'nombre',
                displayField: 'nombre'
            }, {
                xtype: 'numberfield',
                name: 'cantidadRestante',
                fieldLabel: 'Cantidad'
            }];
        this.callParent(arguments);
    }
});