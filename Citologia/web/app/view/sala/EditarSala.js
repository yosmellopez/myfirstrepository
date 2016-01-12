Ext.define('Citologia.view.sala.EditarSala', {
    extend: 'Ext.window.Window',
    title: 'Modificar Sala',
    layout: 'fit',
    modal: true,
    alias: 'widget.aliaseditarsala',
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
                text: 'Modificar',
                action: 'modificar'
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