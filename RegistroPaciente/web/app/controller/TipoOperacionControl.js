Ext.define('Registro.controller.TipoOperacionControl', {
    extend: 'Ext.app.Controller',
    views: ['tipoOperacion.GridTipoOperacion', 'tipoOperacion.NuevoTipoOperacion', 'tipoOperacion.ModificarTipoOperacion', 'tipoOperacion.Form', 'tipoOperacion.BusquedaTipoOperacion'],
    stores: ['TiposOperaciones'],
    models: ['TipoOperacion'],
    refs: [{
            ref: 'grid',
            selector: 'gridTipoOperacion'
        }],
    init: function () {
        this.control({
            'gridTipoOperacion button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoTipoOperacion button[action=insertar]': {
                click: this.insertar
            },
            'gridTipoOperacion': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarTipoOperacion button[action=modificar]': {
                click: this.modificar
            },
            'gridTipoOperacion button[action=eliminar]': {
                click: this.eliminar
            },
            'busquedaTipoOperacion button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoTipoOperacion');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getTiposOperacionesStore();
            valores = basicForm.getValues();
            tiposOperaciones = valores.tipoOperacionRecursos;
            tipos = new Array();
            for (i = 0; i < tiposOperaciones.length; i++) {
                tipos.push({recurso: tiposOperaciones[i], cantidad: tiposOperaciones[i].cantidadRestante});
            }
            valores.tipoOperacionRecursos = tipos;
            record = Ext.create('Registro.model.TipoOperacion', valores);
            store.add(record);
            win.setLoading('Insertando tipo de operaci\u00f3n...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Tipo de operaci\u00f3n insertada exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: action.proxy.reader.jsonData.msg,
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
        win = Ext.widget('modificarTipoOperacion');
        form = win.down('form');
        form.loadRecord(record);
        win.show(grid);
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            tiposOperaciones = valores.tipoOperacionRecursos;
            tipos = new Array();
            for (i = 0; i < tiposOperaciones.length; i++) {
                tipos.push({recurso: tiposOperaciones[i], cantidad: tiposOperaciones[i].cantidadRestante});
            }
            valores.tipoOperacionRecursos = tipos;
            record.set(valores);
            store = this.getTiposOperacionesStore();
            if (record.dirty)
                win.setLoading('Modificando tipo de operaci\u00f3n...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Tipo de operaci\u00f3n guardada exitosamente',
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
            store = this.getTiposOperacionesStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>�Desea continuar?';
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
                        grid.setLoading('Eliminando tipoOperacion' + (n === 1 ? '' : 'es') + '...');
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
    },
    buscar: function (bot) {
        form = bot.up('form');
        store = this.getTiposOperacionesStore();
        store.load({
            params: {
                parametros: Ext.encode(form.getValues())
            }
        });
    }
});