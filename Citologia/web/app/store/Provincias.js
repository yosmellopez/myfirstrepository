Ext.define('Citologia.store.Provincias', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.Provincia',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: 'provincia.json',
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
                                msg = 'Ocurrió un error interno del servidor al listar los provincias';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar el provincia';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar el provincia';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar el provincia';
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