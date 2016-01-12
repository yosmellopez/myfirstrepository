Ext.onReady(function () {
    var usuario = Ext.get('login_username');
    usuario.on('keypress', function (event) {
        if (event.getKey() === event.ENTER) {
            formulario.iniciarSesion();
        }
    });
    var contrasena = Ext.get('login_password');
    contrasena.on('keypress', function (event) {
        if (event.getKey() === event.ENTER) {
            formulario.iniciarSesion();
        }
    });
    iniciarSesion = Ext.get('iniciar_sesion');
    iniciarSesion.on('click', function () {
        formulario.iniciarSesion();
    });
    var formulario = {
        iniciarSesion: function () {
            formu = Ext.create('Ext.form.Panel');
            valores = {j_username: usuario.getValue(), j_password: contrasena.getValue()};
            if (valores.j_username === '' || valores.j_password === '') {
                msg = valores.j_username === '' ? 'Debe insertar un nombre de usuario.' : 'Debe insertar una contrase\u00f1a.';
                Ext.Msg.show({
                    title: 'Informaci\u00f3n',
                    icon: Ext.Msg.INFO,
                    msg: msg,
                    buttons: Ext.Msg.OK
                });
            } else {
                valores.j_password = hex_sha512(valores.j_password);
                formu.submit({
                    url: 'iniciar_sesion',
                    standardSubmit: true,
                    params: valores
                });
            }
        }
    };
});