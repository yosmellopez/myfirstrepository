Ext.define('Citologia.view.sala.InsertarSala', {
    extend: 'Ext.window.Window',
    title: 'Añadir Sala',
    layout: 'fit',
    modal: true,
    alias: 'widget.aliassalaadd',
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                items: [{
                        xtype: 'panel',
                        border: 0,
                        defaults: {
                            width: 300,
                            allowBlank: false
                        },
                        items: [{
                                xtype: 'textfield',
                                name: 'nombreSala',
                                fieldLabel: 'Nombre',
                                hideTrigger: true
                            }, {
                                xtype: 'numberfield',
                                name: 'camaReal',
                                fieldLabel: 'Cama Física',
                                minValue: 1,
                                maxValue: 100
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Insertar',
                action: 'save'
            }, {
                text: 'Cancelar',
                scope: this,
                style: {
                    marginRight: '5px'
                },
                handler: this.close,
                iconAlign: 'right'
            }];
        this.callParent(arguments);
    }

});