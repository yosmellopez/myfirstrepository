Ext.define('Citologia.view.provincia.NuevaProvincia', {
    extend: 'Ext.window.Window',
    title: 'Nueva Provincia',
    alias: 'widget.nuevaProvincia',
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
                        emptyText: 'Inserte nombre privincia'
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