Ext.define('Registro.view.areaSalud.ModificarAreaSalud', {
    extend: 'Ext.window.Window',
    title: 'Modificar Area Salud',
    alias: 'widget.modificarAreaSalud',
    width: 430,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            defaults: {
                allowBlank: false,
                labelWidth: 140,
                width: 405
            },
            items: [{
                xtype: 'textfield',
                name: 'nombre',
                fieldLabel: 'Nombre de Area de Salud',
                emptyText: 'Inserte nombre de area de salud',
                vtype:'vacio'
            },{
                xtype: 'textfield',
                name: 'direccion',
                fieldLabel: 'Direccion de Area de Salud',
                emptyText: 'Direccion nombre de area de salud',
                vtype:'vacio'
            }]
        }];
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