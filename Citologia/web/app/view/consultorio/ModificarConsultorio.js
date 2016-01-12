Ext.define('Citologia.view.consultorio.ModificarConsultorio', {
    extend: 'Ext.window.Window',
    title: 'Modificar Consultorio',
    alias: 'widget.editarConsultorio',
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
                        autoSelect: false,
                        emptyText: 'Inserte Area de Salud',
                        displayTpl: new Ext.XTemplate('<tpl for="."><tpl if="nombre.nombre!=undefined">{nombre.nombre}<tpl else>{nombre}</tpl></tpl>')
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