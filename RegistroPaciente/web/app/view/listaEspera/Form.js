Ext.define('Registro.view.listaEspera.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.listaEsperaform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
            name: 'nombreLista',
            fieldLabel: 'Nombre de la Lista de Espera',
            vtype:'vacio'
        }, {
            xtype: 'numberfield',
            name: 'prioridad',
            fieldLabel: 'Prioridad'
        }];
        this.callParent(arguments);
    }
});