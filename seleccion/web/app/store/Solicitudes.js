Ext.define('Seleccion.store.Solicitudes', {
    extend: 'Ext.data.Store',
    model: 'Seleccion.model.Solicitud',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: 'solicitud.json',
        reader: {
            type: 'json',
            rootProperty: 'lista'
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
                }
                else {
                    switch (response.status) {
                        case 500:
                            error = true;
                            if (operacion.action === "read")
                                msg = 'Ocurrió un error interno del servidor al listar las Solicitudeses';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar la Solicitudes';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar la Solicitudes';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar la Solicitudes';
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

