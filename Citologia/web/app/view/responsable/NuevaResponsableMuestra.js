Ext.define('Citologia.view.responsable.NuevaResponsableMuestra', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Responsable de Muestra',
    alias: 'widget.nuevaResponsableMuestra',
    width: 375,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 120,
                    width: 350
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'apellidos',
                        fieldLabel: 'Apellidos',
                        emptyText: 'Inserte apellidos'
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