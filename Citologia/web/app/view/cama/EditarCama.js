Ext.define('Citologia.view.cama.EditarCama', {
    extend: 'Ext.window.Window',
    alias: 'widget.aliaseditarcama',
    title: 'Modificar Cama',
    layout: 'fit',
    modal: true,
    padding: 3,
    width: 383,
    border: false,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    width: 360,
                    allowBlank: false,
                    labelAlign: 'left',
                    labelWidth: 120
                },
                items: [{
                        xtype: 'numberfield',
                        name: 'numeroCama',
                        fieldLabel: 'Numero de cama',
                        minValue: 1,
                        maxValue: 100
                    }, {
                        xtype: 'combo',
                        name: 'sala',
                        fieldLabel: 'Sala',
                        store: 'Salas',
                        id: 'comboSala',
                        valueField: 'csala',
                        displayField: 'nombreSala',
                        queryMode: 'local',
                        action: 'seleccionar',
                        displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">{nombreSala:this.pintar}</tpl>', {
                            pintar: function (obj) {
                                return obj.nombreSala === undefined ? obj : obj.nombreSala;
                            }
                        })
                    }]
            }],
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