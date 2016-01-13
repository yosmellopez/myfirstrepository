Ext.define('Seleccion.controller.ConvivenciaController', {
    extend: 'Ext.app.Controller',
    views: ['convivencia.GridConvivencia', 'convivencia.InsertarConvivencia', 'convivencia.ModificarConvivencia'],
    stores: ['Convivencias'],
    models: ['Convivencia'],
    refs: [{
            ref: 'grid',
            selector: 'gridConvivencia'
        }],
    init: function () {
        this.control({
            'gridConvivencia button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarConvivencia button[action=insertar]': {
                click: this.insertar
            },
            'gridConvivencia': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarConvivencia button[action=modificar]': {
                click: this.modificar
            },
            'gridConvivencia button[action=eliminar]': {
                click: this.eliminar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('insertarConvivencia');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getConvivenciasStore();
            valores = basicForm.getValues();
            record = Ext.create('Seleccion.model.Convivencia', valores);
            store.add(record);
            store.suspendEvents();
            win.close();
        } else
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'El formulario contiene errores',
                buttons: Ext.Msg.OK
            });
    },
    editar: function (grid, record) {
        win = Ext.widget('modificarConvivencia').show(grid);
        win.down('form').loadRecord(record);
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getConvivenciasStore();
            if (record.dirty)
                win.setLoading('Insertando convivencia...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Convivencia guardada exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    store.rejectChanges();
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: action.proxy.reader.jsonData.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.setLoading(false);
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'Debe verificar los campos',
                buttons: Ext.Msg.OK
            });
        }
    },
    eliminar: function () {
        grid = this.getGrid();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getConvivenciasStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                msg: mensaje,
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.OKCANCEL,
                buttonText: new Object({
                    ok: "Si",
                    cancel: "No"
                }),
                fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando convivencia' + (n === 1 ? '' : 'es') + '...');
                        store.sync({
                            success: function () {
                                grid.setLoading(false);
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: 'Registros eliminados exitosamente',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            failure: function (action) {
                                store.rejectChanges();
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: action.proxy.reader.jsonData.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                grid.setLoading(false);
                            }
                        });
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                msg: 'No existen filas seleccionadas',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
    },
    eliminarTecla: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        if (e.getKey() === 46)
            this.eliminar();
    }
});
