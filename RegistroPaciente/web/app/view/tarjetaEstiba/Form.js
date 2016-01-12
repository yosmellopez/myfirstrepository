Ext.define('Registro.view.tarjetaEstiba.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.tarjetaEstibaform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
                name: 'recurso',
                fieldLabel: 'Nombre del recurso',
                vtype: 'vacio'
            }, {
                name: 'cantidad',
                fieldLabel: 'Cantidad'
            }];
        //Definimos qué tiene que aparecer en la parte inferior (un botón de guardar).                

        this.callParent(arguments);
    }
});