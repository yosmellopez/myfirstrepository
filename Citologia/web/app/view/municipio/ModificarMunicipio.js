Ext.define('Citologia.view.municipio.ModificarMunicipio', {
    extend: 'Ext.window.Window',
    alias: 'widget.modificarMunicipio',
    title: 'Modificar Datos Municipio',
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
                        emptyText: 'Inserte nombre de municipio'
                    }, {
                        xtype: 'combo',
                        store: 'Provincias',
                        name: 'provincia',
                        fieldLabel: 'Provincia',
                        displayField: 'provincia',
                        valueField: 'objeto',
                        queryMode: 'local',
                        autoSelect: true,
                        emptyText: 'Seleccione Provincia'
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