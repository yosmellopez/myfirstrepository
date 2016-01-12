Ext.define('Citologia.view.consultorio.NuevoConsultorio', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Consultorio',
    alias: 'widget.nuevoConsultorio',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 150,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre del Consultorio',
                        emptyText: 'Inserte nombre del consultorio'
                    }, {
                        xtype: 'combo',
                        store: 'AreasSalud',
                        name: 'areaSalud',
                        fieldLabel: 'Area de Salud',
                        displayField: 'nombre',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Inserte Area de Salud'
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