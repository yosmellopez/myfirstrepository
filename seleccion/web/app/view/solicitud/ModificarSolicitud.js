Ext.define('Seleccion.view.solicitud.ModificarSolicitud', {
    extend: 'Ext.window.Window',
    title: 'Editar Solicitud',
    alias: 'widget.modificarSolicitud',
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
                        name: 'causaSolicitud',
                        fieldLabel: 'Causa de la Solicitud',
                        emptyText: 'Insertar causa de la solicitud'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaSolicitud',
                        fieldLabel: 'Fecha de la Solicitud',
                        format: 'd/m/Y',
                        editable: false,
                        emptyText: 'Seleccionar fecha de la solicitud'
                    }, {
                        xtype: 'combo',
                        store: 'Aspirantes',
                        name: 'aspirante',
                        fieldLabel: 'Aspirante',
                        displayField: 'nombre',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Aspirante',
                        displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}</tpl>'),
                        tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
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

