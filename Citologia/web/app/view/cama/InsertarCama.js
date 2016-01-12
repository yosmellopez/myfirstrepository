Ext.define('Citologia.view.cama.InsertarCama', {
    extend: 'Ext.window.Window',
    title: 'Añadir Cama',
    width: 383,
    layout: 'fit',
    modal: true,
    alias: 'widget.aliascamaadd',
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
                        forceSelection: true,
                        emptyText: 'Selección Sala',
                        queryMode: 'local'
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