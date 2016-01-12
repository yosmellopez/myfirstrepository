Ext.define('Citologia.view.usuario.NuevoUsuario', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Usuario',
    alias: 'widget.nuevoUsuario',
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
                    }, {
                        xtype: 'textfield',
                        name: 'usuario',
                        fieldLabel: 'Nombre de Usuario',
                        emptyText: 'Inserte nombre de usuario'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'contrasenna',
                        fieldLabel: 'Contrase\u00f1a',
                        emptyText: 'Introduzca Contrase\u00f1a'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password1',
                        submitValue: false,
                        fieldLabel: 'Repetir Contrase\u00f1a',
                        emptyText: 'Repita Contrase\u00f1a',
                        validator: function (value) {
                            var password1 = this.previousSibling('[name=contrasenna]');
                            return (value === password1.getValue()) ? true : 'Las contrase\u00f1as no coinciden.';
                        }
                    }, {
                        xtype: 'combo',
                        store: 'Roles',
                        name: 'rol',
                        fieldLabel: 'Rol',
                        displayField: 'rol',
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        autoSelect: false,
                        emptyText: 'Seleccione Rol'
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