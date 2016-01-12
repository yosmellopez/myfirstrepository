Ext.define('Citologia.view.areaSalud.NuevoAreaSalud', {
    extend: 'Ext.window.Window',
    title: 'Nueva Area de Salud',
    alias: 'widget.nuevoAreaSalud',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 160,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre del Area de Salud',
                        emptyText: 'Inserte nombre del area de salud'
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