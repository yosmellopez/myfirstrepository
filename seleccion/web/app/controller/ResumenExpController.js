Ext.define('Seleccion.controller.ResumenExpController', {
    extend: 'Ext.app.Controller',
    views: ['resumenExpediente.GridResumenExp', 'resumenExpediente.InsertarResumenExp', 'resumenExpediente.ModificarResumenExp'],
    stores: ['ResumenExpedientes', 'Aspirantes'],
    models: ['ResumenExp', 'Aspirante'],
    refs: [{
            ref: 'grid',
            selector: 'gridResumenExp'
        }],
    init: function () {
        this.control({
            'gridResumenExp button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarResumenExp button[action=insertar]': {
                click: this.insertar
            },
            'gridResumenExp': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarResumenExp button[action=modificar]': {
                click: this.modificar
            },
            'gridResumenExp button[action=eliminar]': {
                click: this.eliminar
            },
            'gridResumenExp button>menu>menuitem[action=generar]': {
                click: this.generarReporte
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('insertarResumenExp');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getResumenExpedientesStore();
            valores = basicForm.getValues();
            record = Ext.create('Seleccion.model.ResumenExp', valores);
            store.add(record);
            win.setLoading('Insertando resumen de expediente...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Resumen de Expediente insertado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: action.proxy.reader,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    store.rejectChanges();
                    win.setLoading(false);
                }
            });
        } else
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'El formulario contiene errores',
                buttons: Ext.Msg.OK
            });
    },
    editar: function (grid, record) {
        win = Ext.widget('modificarResumenExp').show(grid);
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
            store = this.getResumenExpedientesStore();
            if (record.dirty)
                win.setLoading('Insertando resumen de expediente...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Resumen de expediente guardado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    store.rejectChanges();
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: action.proxy.reader,
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
            store = this.getResumenExpedientesStore();
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
                        grid.setLoading('Eliminando resumen' + (n === 1 ? '' : 'es') + ' de expediente' + (n === 1 ? '' : 'es') + '...');
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
                                    msg: action.proxy.reader,
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
    },
    generarReporte: function (item) {
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length !== 0) {
            record = seleccion[0];
            window.open('../' + item.formato + '/' + record.getId() + '/resumenExpedienteReporte', '_new');
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'Debe seleccionar un registro',
                buttons: Ext.Msg.OK
            });
        }
    }
});