Ext.define('Seleccion.view.observacion.InsertarObservacion', {
    extend: 'Ext.window.Window',
    title: 'Editar Observacion',
    alias: 'widget.modificarObservacion',
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
                        name: 'fechaPresentacion',
                        fieldLabel: 'Fecha de Presentacion',
                        emptyText: 'Inserte la fecha de presentacion'
                    },
                {
                        xtype: 'textfield',
                        name: 'fechaBaja',
                        fieldLabel: 'Fecha de Baja',
                        emptyText: 'Inserte la fecha de Baja'
                    },
                {
                        xtype: 'textfield',
                        name: 'motivoBaja',
                        fieldLabel: 'Motivo de Baja',
                        emptyText: 'Inserte motivos de baja'
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




