Ext.onReady(function () {
    var formulario = Ext.widget('form', {
        title: "Iniciar Sesi\u00f3n",
        bodyPadding: '5 5 3',
        width: 425,
        renderTo: 'contenido',
        style: {
            margin: 'auto auto',
            position: 'relative',
            top: '-100px'
        },
        items: [{
                xtype: "panel",
                defaultButton: "loginButton",
                autoComplete: true,
                bodyPadding: "20 20",
                cls: "auth-dialog-login",
                header: false,
                width: 415,
                layout: {
                    type: "vbox", align: "stretch"
                },
                defaults: {margin: "5 0"},
                items: [{
                        xtype: "textfield",
                        cls: "auth-textbox",
                        name: "j_username",
                        height: 55,
                        allowBlank: false,
                        emptyText: "Nombre de Usuario",
                        blankText: 'Este campo es requerido',
                        triggers: {
                            glyphed: {cls: "fa fa-user fa-2-5x pull-right bajar-1x"}
                        },
                        value: nombreUsuario,
                        listeners: {
                            specialkey: function (field, event) {
                                if (event.getKey() === event.ENTER) {
                                    this.up('form').login();
                                }
                            }
                        }
                    }, {
                        xtype: "textfield",
                        cls: "auth-textbox",
                        height: 55,
                        emptyText: "Contraseña",
                        inputType: "password",
                        name: "j_password",
                        blankText: 'Este campo es requerido',
                        allowBlank: false,
                        triggers: {
                            glyphed: {cls: "fa fa-lock fa-2-5x pull-right bajar-1x"}
                        },
                        listeners: {
                            specialkey: function (field, event) {
                                if (event.getKey() === event.ENTER) {
                                    this.up('form').login();
                                }
                            }
                        }
                    }, {
                        xtype: 'label',
                        id: 'mensaje',
                        flex: 1,
                        align: 'left',
                        value: error,
                        html: '<span style="color:red;font-weight:bold;font-size:13px;height:20px;">' + error + '</span>',
                        style: {
                            color: 'red'
                        }
                    }, {
                        xtype: "button",
                        scale: "large",
                        ui: "soft-green",
                        iconAlign: "right",
                        iconCls: "x-fa fa-angle-right",
                        text: "Iniciar Sesi\u00f3n",
                        formBind: true,
                        handler: function () {
                            this.up('form').login();
                        }
                    }]
            }],
        login: function () {
            formu = formulario.getForm();
            formulario.queryById('mensaje').setText('');
            formulario.setLoading('<span style="font-size:13px;">Iniciando sesi\u00f3n...</span>');
            if (formu.isValid()) {
                loginForm = Ext.create('Ext.form.Panel');
                bLoginForm = loginForm.getForm();
                valores = formu.getValues();
                valores.j_password = hex_sha512(valores.j_password);
                bLoginForm.submit({
                    url: 'j_spring_security_check',
                    standardSubmit: true,
                    clientValidation: true,
                    params: valores
                });
            } else {
                Ext.Msg.show({
                    msg: 'El formulario contiene errores. Verifique los campo se\u00f1alados',
                    title: 'Error',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                formulario.setLoading(false);
            }
        }
    });
});

