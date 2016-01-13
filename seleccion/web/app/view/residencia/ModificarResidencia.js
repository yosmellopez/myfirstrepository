Ext.define('Seleccion.view.residencia.ModificarResidencia', {
    extend: 'Ext.window.Window',
    title: 'Editar Residencia',
    alias: 'widget.modificarResidencia',
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
                        name: 'desde',
                        fieldLabel: 'Desde(d/m/a)',
                        emptyText: 'Inserte fecha de inicio'
                    }, {
                        xtype: 'textfield',
                        name: 'hasta',
                        fieldLabel: 'Hasta(d/m/a)',
                        emptyText: 'Inserte fecha de salida'
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



