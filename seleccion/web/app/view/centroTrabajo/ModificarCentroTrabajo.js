Ext.define('Seleccion.view.centroTrabajo.ModificarCentroTrabajo', {
    extend: 'Ext.window.Window',
    title: 'Editar Centro Trabajo',
    alias: 'widget.modificarCentroTrabajo',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 150,
                    width: 430
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre Centro Trabajo',
                        emptyText: 'Inserte nombre centro de trabajo '
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

