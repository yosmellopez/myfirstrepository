Ext.define('Seleccion.view.integRev.ModificarIntegRev', {
    extend: 'Ext.window.Window',
    title: 'Editar Integraci\u00f3n Revolucionaria',
    alias: 'widget.modificarIntegRev',
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
                items: [{
                        xtype: 'textfield',
                        name: 'integracionRevolucionaria',
                        fieldLabel: 'Integraci\u00f3n Revolucionaria',
                        emptyText: 'Inserte la integraci\u00f3n Revolucionaria'
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


