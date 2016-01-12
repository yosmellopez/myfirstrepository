Ext.define('Registro.view.especialidad.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.especialidadform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
            name: 'especialidad',
            fieldLabel: 'Nombre de la Especialidad',
            vtype:'vacio'
        }];
        //Definimos qué tiene que aparecer en la parte inferior (un botón de guardar).                

        this.callParent(arguments);
    }
});