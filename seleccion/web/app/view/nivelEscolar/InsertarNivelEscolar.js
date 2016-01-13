Ext.define('Seleccion.view.nivelEscolar.InsertarNivelEscolar', {
    extend: 'Ext.window.Window',
    title: 'Insertar Nivel Escolar',
    alias: 'widget.insertarNivelEscolar',
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
                        name: 'nivelEscolar',
                        fieldLabel: 'Nivel Escolar',
                        emptyText: 'Inserte el nivel escolar'
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
