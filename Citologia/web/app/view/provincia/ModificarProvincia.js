Ext.define('Citologia.view.provincia.ModificarProvincia', {
    extend: 'Ext.window.Window',
    alias: 'widget.modificarProvincia',
    title: 'Modificar Datos Provincia',
    width: 375,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 130,
                    width: 350
                },
                items: [{
                        xtype: 'textfield',
                        name: 'provincia',
                        fieldLabel: 'Nombre de Provincia',
                        emptyText: 'Inserte nombre de provincia'
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