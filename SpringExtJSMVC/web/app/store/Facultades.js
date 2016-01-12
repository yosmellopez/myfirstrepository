Ext.define('CRUD.store.Facultades', {
    extend: 'Ext.data.Store',
    model: 'CRUD.model.Facultad',
    autoLoad: true,
    proxy: {type: 'rest',
        url: 'facultad.json',
        timeout: 120000,
        reader: {type: 'json', root: 'lista'},
        writer: {type: 'json', writeAllFields: true},
        listeners: {exception: function (reader, response, operacion) {
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
                                msg = 'Ocurrió un error interno del servidor al listar las facultades';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar la facultad';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar la facultad';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar la(s) facultad(es)';
                            break;
                        case 200:
                            msg = Ext.decode(response.responseText).msg;
                            error = true;
                            break;
                        }
                }
                if (error)
                    Ext.Msg.show({title: 'Informaci\u00f3n', icon: Ext.Msg.ERROR, msg: msg, buttons: Ext.Msg.OK});
            }}}});