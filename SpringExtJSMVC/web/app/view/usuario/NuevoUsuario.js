Ext.define('CRUD.view.usuario.NuevoUsuario', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Usuario',
    alias: 'widget.nuevoUsuario',
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
                defaultFocus: 'textfield[name=nombre]',
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
                        xtype: 'numberfield',
                        name: 'ci',
                        fieldLabel: 'No. Identidad',
                        emptyText: 'No. Identidad'
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
                        allowBlank: false
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
                        emptyText: 'Seleccione Rol'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaAcceso',
                        fieldLabel: 'Fecha Acceso',
                        emptyText: 'Seleccione Fecha Acceso'
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

