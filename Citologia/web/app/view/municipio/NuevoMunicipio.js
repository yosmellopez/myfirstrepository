Ext.define('Citologia.view.municipio.NuevoMunicipio', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Municipio',
    alias: 'widget.nuevoMunicipio',
    width: 375,
    modal: true,
    resizable: false,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 130,
                    width: 350
                },
                items: [{
                        xtype: 'textfield',
                        name: 'municipio',
                        fieldLabel: 'Nombre de Municipio',
                        emptyText: 'Inserte nombre municipio'
                    }, {
                        xtype: 'combo',
                        store: 'Provincias',
                        name: 'provincia',
                        fieldLabel: 'Provincia',
                        displayField: 'provincia',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Provincia'
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