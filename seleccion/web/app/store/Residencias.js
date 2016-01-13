Ext.define('Seleccion.store.Residencias', {
    extend: 'Ext.data.Store',
    model: 'Seleccion.model.Residencia',
    autoLoad: false,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: 'residencia.json',
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
                } else {
                    switch (response.status) {
                        case 500:
                            error = true;
                            if (operacion.action === "read")
                                msg = 'Ocurrió un error interno del servidor al listar las Residenciases';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar la Residencias';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar la Residencias';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar la Residencias';
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
    },
    getDatos: function () {
        datos = new Array();
        this.each(function (reg) {
            datos.push(reg.get('objeto'));
        });
        return datos;
    }
});
