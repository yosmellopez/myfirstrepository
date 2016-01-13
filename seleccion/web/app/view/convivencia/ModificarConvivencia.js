Ext.define('Seleccion.view.convivencia.ModificarConvivencia', {
    extend: 'Ext.window.Window',
    title: 'Insertar Convivencia',
    alias: 'widget.modificarConvivencia',
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
                        name: 'parentesco',
                        fieldLabel: 'Parentesco',
                        emptyText: 'Inserte el parentesco'
                    }, {
                        xtype: 'textfield',
                        name: 'centroTrabajo',
                        fieldLabel: 'Centro de Trabajo',
                        emptyText: 'Inserte el centro de trabajo'
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




