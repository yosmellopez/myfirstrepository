Ext.define('Seleccion.view.integRev.InsertarIntegRev', {
    extend: 'Ext.window.Window',
    title: 'Insertar Integraci\u00f3n Revolucionaria',
    alias: 'widget.insertarIntegRev',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 170,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'integracionRevolucionaria',
                        fieldLabel: 'Integracion Revolucionaria',
                        emptyText: 'Inserte la integracion Revolucionaria'
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

