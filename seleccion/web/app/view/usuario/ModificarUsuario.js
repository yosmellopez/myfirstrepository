Ext.define('Seleccion.view.usuario.ModificarUsuario', {
    extend: 'Ext.window.Window',
    title: 'Modificar Usuario',
    alias: 'widget.modificarUsuario',
    width: 430,
    modal: true,
    controller: 'password',
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                id: 'formulario',
                contador: true,
                defaults: {
                    allowBlank: false,
                    labelWidth: 140,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte el nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'apellidos',
                        fieldLabel: 'Apellidos',
                        emptyText: 'Inserte Apellidos'
                    }, {
                        xtype: 'textfield',
                        name: 'usuario',
                        fieldLabel: 'Usuario',
                        emptyText: 'Inserte nombre de usuario'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Contraseña',
                        name: 'contrasena',
                        inputType: 'password',
                        itemId: 'pass',
                        allowBlank: true,
                        listeners: {
                            validitychange: 'validateField',
                            blur: 'validateField'
                        }
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        fieldLabel: 'Confirmar Contraseña',
                        allowBlank: true,
                        submitValue: false,
                        initialPassField: 'pass' // id of the initial password field
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
                        editable: false,
                        emptyText: 'Seleccione Rol',
                        displayTpl: new Ext.XTemplate('<tpl for=".">{rol:this.b}</tpl>', {
                            b: function (o) {
                                form = Ext.getCmp('formulario');
                                if (form.contador) {
                                    r = form.getRecord();
                                    form.contador = false;
                                    return r.get('rol').rol;
                                }
                                return o;
                            }
                        })
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
