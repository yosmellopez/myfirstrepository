Ext.onReady(function () {
    var panel = Ext.create('Ext.panel.Panel', {
        width: '100%',
        renderTo: 'perfil',
        bodyBorder: true,
        split: true,
        viewModel: {data: {tamano: '100%', tpanel: '100%', form: '100%'}},
        bind: {width: '{tpanel}'},
        layout: {type: 'auto'},
        items: [{
                xtype: 'form',
                bodyPadding: 10,
                flex: 1,
                bind: {width: '{form}'},
                layout: {type: 'vbox'},
                defaults: {labelWidth: 120, flex: 1, bind: {width: '{tamano}'}},
                items: [{
                        xtype: 'textfield',
                        name: 'usuario',
                        fieldLabel: 'Nombre de Usuario',
                        allowBlank: false,
                        readOnly: true,
                        emptyText: 'Introduzca Nombre de Usuario',
                        value: usuario
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
                        fieldLabel: 'Nueva Contrase\u00f1a',
                        validator: function (value) {
                            var password2 = this.nextSibling('[name=password1]');
                            return (value === password2.getValue()) ? true : 'Las contrase\u00f1as no coinciden.';
                        }
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password1',
                        submitValue: false,
                        id: 'pass',
                        fieldLabel: 'Repetir Contrase\u00f1a',
                        validator: function (value) {
                            var password1 = this.previousSibling('[name=password]');
                            return (value === password1.getValue()) ? true : 'Las contrase\u00f1as no coinciden.';
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre Profesor',
                        value: nombre,
                        allowBlank: false,
                        emptyText: 'Inserte Nombre Profesor',
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
                dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {pack: 'end'},
                        items: [{
                                iconCls: 'fa fa-edit blue bajar-3x fa-2x',
                                scale: 'medium',
                                text: 'Modificar Perfil',
                                handler: function () {
                                    form = panel.down('form');
                                    miFormulario = form.getForm();
                                    formulario = Ext.create('Ext.form.Panel');
                                    valores = form.getValues();
                                    if (valores.contrasena !== '')
                                        valores.contrasena = hex_md5(valores.contrasena);
                                    if (valores.password !== '') {
                                        valores.password = hex_md5(valores.password)
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
                                                    msg: 'Perfil modificado correctamente',
                                                    icon: Ext.Msg.INFO,
                                                    buttons: Ext.Msg.OK
                                                });
                                            },
                                            failure: function (formu, action) {
                                                if (action.result.logout)
                                                    window.open('/salir.htm', '_self');
                                                panel.setLoading(false);
                                                miFormulario.markInvalid(action.result.errores);
                                            }
                                        })
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
            }]
    });
    boton = Ext.get('ocultar');
    boton.on('click', function () {
        perfil = Ext.get('perfil');
        panel.setWidth(perfil.getWidth() - (expandido ? -88 : 88));
        panel.down('form').setWidth(perfil.getWidth() - (expandido ? -88 : 88));
        expandido = !expandido;
    })
});