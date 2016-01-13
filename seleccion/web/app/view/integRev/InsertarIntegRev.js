Ext.define('Seleccion.view.integRev.InsertarIntegRev', {
    extend: 'Ext.window.Window',
    title: 'Insertar Integraci\u00f3n Revolucionaria',
    alias: 'widget.insertarIntegRev',
    width: 450,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 180,
                    width: 435
                },
                items: [{
                        xtype: 'textfield',
                        name: 'integracionRevolucionaria',
                        fieldLabel: 'Integraci\u00f3n Revolucionaria',
                        emptyText: 'Inserte la integraci\u00f3n Revolucionaria'
                    }, {
                        xtype: 'textfield',
                        name: 'siglas',
                        fieldLabel: 'Siglas',
                        emptyText: 'Inserte las siglas'
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

