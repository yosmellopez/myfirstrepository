Ext.define('Seleccion.store.Convivencias', {
    extend: 'Ext.data.Store',
    model: 'Seleccion.model.Convivencia',
    autoLoad: false,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url: 'convivencia.json',
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
                                msg = 'Ocurrió un error interno del servidor al listar las Convivenciaes';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar la Convivencia';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar la Convivencia';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar la Convivencia';
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


