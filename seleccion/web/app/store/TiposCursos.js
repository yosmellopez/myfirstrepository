Ext.define('Seleccion.store.TiposCursos', {
    extend: 'Ext.data.Store',
    model: 'Seleccion.model.TipoCurso',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'tipoCurso.json',
        reader: {
            type: 'json',
            rootProperty: 'lista'
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
                                msg = 'Ocurrió un error interno del servidor al listar las tipos de cursos';
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
