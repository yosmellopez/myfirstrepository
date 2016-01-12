Ext.onReady(function () {
    var panel = Ext.create('Ext.panel.Panel', {
        title: 'Editar Datos de Mi Perfil',
        width: 440,
        renderTo: 'centro',
        bodyBorder: true,
        items: [{
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    width: 420,
                    labelWidth: 120
                },
                items: [{
                        xtype: 'textfield',
                        name: 'usuario',
                        fieldLabel: 'Nombre de Usuario',
                        allowBlank: false,
                        readOnly: true,
                        emptyText: 'Introduzca Nombre de Usuario',
                        value: usuario,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        allowBlank: false,
                        blankText: 'Debe insertar su contrase\u00f1a actual para poder modificar su perfil',
                        name: 'contrasena',
                        fieldLabel: 'Contrase\u00f1a Actual'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password',
                        fieldLabel: 'Nueva Contrase\u00f1a'
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password1',
                        submitValue: false,
                        id: 'pass',
                        fieldLabel: 'Repetir Contrase\u00f1a', validator: function (value) {
                            var password1 = this.previousSibling('[name=password]');
                            return (value === password1.getValue()) ? true : 'Las contrase\u00f1as no coinciden.';
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        value: nombre,
                        allowBlank: false,
                        emptyText: 'Inserte Nombre',
                        vtype: 'nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'apellidos',
                        fieldLabel: 'Apellidos',
                        value: apellidos,
                        allowBlank: false,
                        emptyText: 'Inserte Apellidos Profesor',
                        vtype: 'apellidos'
                    }],
                buttons: [{
                        text: 'Modificar Perfil',
                        handler: function () {
                            form = panel.down('form');
                            miFormulario = form.getForm();
                            formulario = Ext.create('Ext.form.Panel');
                            valores = form.getValues();
                            if (valores.contrasena !== '')
                                valores.contrasena = hex_sha512(valores.contrasena);
                            if (valores.password !== '') {
                                valores.password = hex_sha512(valores.password);
                            }
                            if (miFormulario.isValid()) {
                                bform = formulario.getForm();
                                panel.setLoading('Modificando perfil...');
                                bform.submit({
                                    url: "perfil.json/" + idUsuario + '?password=' + valores.password,
                                    clientValidation: true,
                                    jsonSubmit: true,
                                    params: valores,
                                    success: function () {
                                        panel.setLoading(false);
                                        Ext.Msg.show({
                                            title: 'Informaci\u00f3n',
                                            msg: 'Perfil modificados correctamente',
                                            icon: Ext.Msg.INFO,
                                            buttons: Ext.Msg.OK
                                        });
                                    },
                                    failure: function (formu, action) {
                                        if (action.result.logout)
                                            window.open('j_spring_security_logout', '_self');
                                        panel.setLoading(false);
                                        miFormulario.markInvalid(action.result.errores);
                                    }
                                });
                            } else
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: 'Debe verificar todos los campos',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                        }
                    }]
            }]
    });
});