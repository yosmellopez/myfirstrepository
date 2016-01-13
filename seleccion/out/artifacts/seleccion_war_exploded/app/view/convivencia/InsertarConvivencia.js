Ext.define('Seleccion.view.convivencia.InsertarConvivencia', {
    extend: 'Ext.window.Window',
    title: 'Insertar Convivencia',
    alias: 'widget.insertarConvivencia',
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
                        name: 'nombreApellidos',
                        fieldLabel: 'Nombre y Apellidos',
                        emptyText: 'Inserte nombre y apellidos'
                    }, {
                        xtype: 'numberfield',
                        name: 'edad',
                        fieldLabel: 'Edad',
                        emptyText: 'Inserte edad'
                    }, {
                        xtype: 'textfield',
                        name: 'parentesco',
                        fieldLabel: 'Parentesco',
                        emptyText: 'Inserte el parentesco'
                    }, {
                        xtype: 'textfield',
                        name: 'centroTrabajoEscuela',
                        fieldLabel: 'Centro de Trabajo',
                        emptyText: 'Inserte el centro de trabajo'
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


