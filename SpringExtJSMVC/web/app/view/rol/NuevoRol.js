Ext.define('CRUD.view.rol.NuevoRol', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Usuario',
    alias: 'widget.nuevoRol',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            defaults: {
                allowBlank: false,
                labelWidth: 140,
                width: 405
            },
            defaultFocus: 'textfield[name=rol]',
            items: [{
                xtype: 'textfield',
                name: 'rol',
                fieldLabel: 'Nombre',
                emptyText: 'Inserte el nombre del rol'
            }]
        }];
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

