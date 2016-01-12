Ext.define('Citologia.store.TarjetasPruebas', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.TarjetaPrueba',
    autoLoad: true,
    pageSize: 20,
    groupField: 'nombre',
    proxy: {
        type: 'rest',
        url: 'tarjetaPrueba.json',
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'lista'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        listeners: {
            exception: function (reader, response, operacion) {
                msg = '';
                error = false;
                if (response.timedout) {
                    msg = 'Se ha abortado la conexi\u00f3n por demoras en el servidor';
                    error = true;
                } else {
                    switch (response.status) {
                        case 500:
                            error = true;
                            if (operacion.action === "read")
                                msg = 'Ocurrió un error interno del servidor al listar los tarjeta pruebas';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar el tarjeta prueba';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar el tarjeta prueba';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar el tarjeta prueba';
                            break;
                        case 200:
                            msg = Ext.decode(response.responseText).msg;
                            error = true;
                            break;
                    }
                }
                if (error)
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        icon: Ext.Msg.ERROR,
                        msg: msg,
                        buttons: Ext.Msg.OK
                    });
            }
        }
    }
});