Ext.define('Citologia.controller.ConsultorioControl', {
    extend: 'Ext.app.Controller',
    views: ['consultorio.NuevoConsultorio', 'consultorio.ModificarConsultorio', 'consultorio.GridConsultorio',
        'areaSalud.NuevoAreaSalud', 'areaSalud.ModificarAreaSalud', 'areaSalud.GridAreaSalud'],
    stores: ['Consultorios', 'AreasSalud'],
    models: ['Consultorio', 'AreaSalud'],
    refs: [{
            ref: 'grid',
            selector: 'gridConsultorio'
        }, {
            ref: 'gridArea',
            selector: 'gridAreaSalud'
        }],
    init: function () {
        this.control({
            'gridConsultorio button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoConsultorio button[action=insertar]': {
                click: this.insertar
            },
            'gridConsultorio': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'editarConsultorio button[action=modificar]': {
                click: this.modificar
            },
            'gridConsultorio button[action=eliminar]': {
                click: this.eliminar
            },
            'gridAreaSalud button[action=nuevo]': {
                click: this.nuevoAreaSalud
            },
            'nuevoAreaSalud button[action=insertar]': {
                click: this.insertarAreaSalud
            },
            'gridAreaSalud': {
                itemdblclick: this.editarAreaSalud,
                cellkeydown: this.eliminarTeclaAreaSalud
            },
            'editarAreaSalud button[action=modificar]': {
                click: this.modificarAreaSalud
            },
            'gridAreaSalud button[action=eliminar]': {
                click: this.eliminarAreaSalud
            },
            'gridConsultorio button[action=editar]': {
                click: this.actualizar
            },
            'gridAreaSalud button[action=editar]': {
                click: this.actualizarAreaSalud
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoConsultorio');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getConsultoriosStore();
            valores = basicForm.getValues();
            record = Ext.create('Citologia.model.Consultorio', valores);
            store.add(record);
            win.setLoading('Insertando consultorio...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Consultorio insertado exitosamente',
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
        win = Ext.widget('editarConsultorio').show(grid);
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
            store = this.getConsultoriosStore();
            if (record.dirty)
                win.setLoading('Modificando consultorio...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Consultorio guardado exitosamente',
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
            store = this.getConsultoriosStore();
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
                        grid.setLoading('Eliminando consultorio' + (n === 1 ? '' : 'es') + '...');
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
    nuevoAreaSalud: function (button) {
        win = Ext.widget('nuevoAreaSalud');
        win.show(button);
    },
    insertarAreaSalud: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getAreasSaludStore();
            valores = basicForm.getValues();
            record = Ext.create('Citologia.model.AreaSalud', valores);
            store.add(record);
            win.setLoading('Insertando area de salud...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Area de salud insertada exitosamente',
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
    editarAreaSalud: function (grid, record) {
        win = Ext.widget('editarAreaSalud').show(grid);
        win.down('form').loadRecord(record);
    },
    modificarAreaSalud: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            console.log(record);
            store = this.getAreasSaludStore();
            if (record.dirty)
                win.setLoading('Modificando area de salud...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Area de salud guardada exitosamente',
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
    eliminarAreaSalud: function () {
        grid = this.getGridArea();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getAreasSaludStore();
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
                        grid.setLoading('Eliminando Area ' + (n === 1 ? '' : 's') + ' de Salud...');
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
    eliminarTeclaAreaSalud: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        if (e.getKey() === 46)
            this.eliminar();
    },
    actualizar: function (bot) {
        grid = this.getGrid();
        selecion = grid.getSelectionModel().getSelection();
        if (selecion.length !== 0) {
            record = selecion[0];
            this.editar(bot, record);
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'No hay registros seleccionados.',
                buttons: Ext.Msg.OK
            });
        }
    },
    actualizarAreaSalud: function (bot) {
        grid = this.getGridArea();
        selecion = grid.getSelectionModel().getSelection();
        if (selecion.length !== 0) {
            record = selecion[0];
            this.editarAreaSalud(bot, record);
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'No hay registros seleccionados.',
                buttons: Ext.Msg.OK
            });
        }
    }
});