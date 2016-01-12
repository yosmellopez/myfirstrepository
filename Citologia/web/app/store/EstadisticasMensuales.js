Ext.define('Citologia.store.EstadisticasMensuales', {
    extend: 'Ext.data.Store',
    model: 'Citologia.model.EstadisticaMensual',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'estadisticaMensual.json',
        reader: {
            type: 'json',
            root: 'lista'
        },
        extraParams: {
            fecha: Ext.Date.format(new Date(), 'F/Y')
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
                                msg = 'Ocurrió un error interno del servidor al listar las editoriales';
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
