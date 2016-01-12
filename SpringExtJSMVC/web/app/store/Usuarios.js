Ext.define('CRUD.store.Usuarios', {
    extend: 'Ext.data.Store',
    model: 'CRUD.model.Usuario',
    autoLoad: true,
    pageSize: 3,
    remoteSort: true,
    proxy: {
        type: 'rest',
        url: 'usuario.json',
        limitParam: 'size',
        sortParam: 'sort',
        directionParam: 'dir',
        timeout: 1200000,
        simpleSortMode: true,
        reader: {
            type: 'json',
            root: 'lista'
        },
//        extraParams: {
//            sort: 'idUsuario,asc'
//        },
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
                                msg = 'Ocurrió un error interno del servidor al listar las editoriales';
                            else if (operacion.action === "create")
                                msg = 'Ocurrió un error interno del servidor al insertar la editorial';
                            else if (operacion.action === "update")
                                msg = 'Ocurrió un error interno del servidor al modificar la editorial';
                            else
                                msg = 'Ocurrió un error interno del servidor al eliminar la editorial';
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


