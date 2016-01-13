Ext.define('Seleccion.view.residencia.InsertarResidencia', {
    extend: 'Ext.window.Window',
    title: 'Insertar Residencia',
    alias: 'widget.insertarResidencia',
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
                        xtype: 'datefield',
                        name: 'desde',
                        format: 'd/m/Y',
                        fieldLabel: 'Desde',
                        emptyText: 'Seleccione fecha de inicio'
                    }, {
                        xtype: 'datefield',
                        name: 'hasta',
                        format: 'd/m/Y',
                        fieldLabel: 'Hasta',
                        emptyText: 'Seleccione fecha de salida'
                    }, {
                        xtype: 'textarea',
                        name: 'direccion',
                        fieldLabel: 'Direcci\u00f3n',
                        emptyText: 'Inserte Direcci\u00f3n'
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


