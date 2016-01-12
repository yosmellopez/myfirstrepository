Ext.define('Registro.controller.OperacionControl', {
    extend: 'Ext.app.Controller',
    views: ['operacion.GridOperacion', 'operacion.NuevoOperacion', 'operacion.ModificarOperacion', 'operacion.Form', 'operacion.BusquedaOperacion'],
    stores: ['Operaciones', 'Grupos', 'Especialidades', 'Causas', 'Recursos'],
    models: ['Operacion', 'Grupo', 'Especialidad', 'Causa', 'Recurso'],
    refs: [{
            ref: 'grid',
            selector: 'gridOperacion'
        }],
    init: function () {
        this.control({
            'gridOperacion button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoOperacion button[action=insertar]': {
                click: this.insertar
            },
            'gridOperacion': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarOperacion button[action=modificar]': {
                click: this.modificar
            },
            'gridOperacion button[action=eliminar]': {
                click: this.eliminar
            },
            'busquedaOperacion button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoOperacion');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getOperacionesStore();
            valores = basicForm.getValues();
            valores.paciente = form.getRegistroPaciente();
            record = Ext.create('Registro.model.Operacion', valores);
            store.add(record);
            win.setLoading('Insertando 0peracion...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Operacion insertada exitosamente',
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
        win = Ext.widget('modificarOperacion');
        form = win.down('form');
        form.loadRecord(record);
        pacienteObj = record.get('paciente');
        form.setRegistroPaciente(pacienteObj);
        form.loadDatosPaciente(pacienteObj);
        win.show(grid);
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getOperacionesStore();
            if (record.dirty)
                win.setLoading('Modificando operacion...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Operacion guardada exitosamente',
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
            store = this.getOperacionesStore();
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
                        grid.setLoading('Eliminando operacion' + (n === 1 ? '' : 'es') + '...');
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
        store = this.getOperacionesStore();
        store.load({
            params: {
                parametros: Ext.encode(form.getValues())
            }
        });
    }
});