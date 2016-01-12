Ext.define('Citologia.controller.ConfiguracionControl', {
    extend: 'Ext.app.Controller',
    views: ['responsable.NuevaResponsableMuestra', 'responsable.ModificarResponsableMuestra', 'responsable.GridResponsableMuestra'],
    stores: ['ResponsablesMuestra'],
    models: ['ResponsableMuestra'],
    refs: [{
            ref: 'grid',
            selector: 'gridResponsableMuestra'
        }],
    init: function () {
        this.control({
            'gridResponsableMuestra button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevaResponsableMuestra button[action=insertar]': {
                click: this.insertar
            },
            'gridResponsableMuestra': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarResponsableMuestra button[action=modificar]': {
                click: this.modificar
            },
            'gridResponsableMuestra button[action=eliminar]': {
                click: this.eliminar
            },
            'gridMunicipio button[action=nuevo]': {
                click: this.nuevoMunicipio
            },
            'nuevoMunicipio button[action=insertar]': {
                click: this.insertarMunicipio
            },
            'gridMunicipio': {
                itemdblclick: this.editarMunicipio,
                cellkeydown: this.eliminarTeclaMunicipio
            },
            'modificarMunicipio button[action=modificar]': {
                click: this.modificarMunicipio
            },
            'gridMunicipio button[action=eliminar]': {
                click: this.eliminarMunicipio
            },
            'gridResponsableMuestra button[action=editar]': {
                click: this.actualizar
            },
            'gridMunicipio button[action=editar]': {
                click: this.actualizarMunicipio
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevaResponsableMuestra');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getResponsablesMuestraStore();
            valores = basicForm.getValues();
            record = Ext.create('Citologia.model.ResponsableMuestra', valores);
            store.add(record);
            win.setLoading('Insertando provincia...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        msg: 'ResponsableMuestra insertado exitosamente',
                        title: 'Informaci\u00f3n',
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
            Ext.Msg.show({icon: Ext.Msg.INFO, msg: 'El formulario contiene errores', buttons: Ext.Msg.OK, title: 'Informaci\u00f3n'});
    },
    editar: function (grid, record) {
        win = Ext.widget('modificarResponsableMuestra').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        cmbRol = form.down('[name=rol]');
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getResponsablesMuestraStore();
            if (record.dirty)
                win.setLoading('Modificando provincia...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'ResponsableMuestra guardado exitosamente',
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
            Ext.Msg.show({title: 'Informaci\u00f3n', icon: Ext.Msg.INFO, msg: 'Debe verificar los campos', buttons: Ext.Msg.OK});
        }
    },
    eliminar: function () {
        grid = this.getGrid();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getResponsablesMuestraStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: mensaje, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.OKCANCEL, buttonText: new Object({ok: "Si", cancel: "No"}), fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando provincia' + (n === 1 ? '' : 'es') + '...');
                        store.sync({
                            success: function () {
                                grid.setLoading(false);
                                Ext.Msg.show({title: 'Informaci\u00f3n', msg: 'Registros eliminados exitosamente', icon: Ext.Msg.INFO, buttons: Ext.Msg.OK});
                            },
                            failure: function (action) {
                                store.rejectChanges();
                                Ext.Msg.show({title: 'Informaci\u00f3n', msg: action.proxy.reader.jsonData.msg, icon: Ext.Msg.INFO, buttons: Ext.Msg.OK});
                                grid.setLoading(false);
                            }
                        });
                    }
                }
            });
        } else {
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: 'No existen filas seleccionadas', buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
        }
    },
    eliminarTecla: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        if (e.getKey() === 46)
            this.eliminar();
    },
    nuevoMunicipio: function (button) {
        win = Ext.widget('nuevoMunicipio');
        win.show(button);
    },
    insertarMunicipio: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getMunicipiosStore();
            valores = basicForm.getValues();
            record = Ext.create('Citologia.model.Municipio', valores);
            store.add(record);
            win.setLoading('Insertando municipio...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        msg: 'Municipio insertado exitosamente',
                        title: 'Informaci\u00f3n',
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
            Ext.Msg.show({icon: Ext.Msg.INFO, msg: 'El formulario contiene errores', buttons: Ext.Msg.OK, title: 'Informaci\u00f3n'});
    },
    editarMunicipio: function (grid, record) {
        win = Ext.widget('modificarMunicipio').show(grid);
        form = win.down('form');
        form.loadRecord(record);
    },
    modificarMunicipio: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getMunicipiosStore();
            if (record.dirty)
                win.setLoading('Modificando municipio...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Municipio guardado exitosamente',
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
            Ext.Msg.show({title: 'Informaci\u00f3n', icon: Ext.Msg.INFO, msg: 'Debe verificar los campos', buttons: Ext.Msg.OK});
        }
    },
    eliminarMunicipio: function () {
        grid = this.getGridMunicipio();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getMunicipiosStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: mensaje, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.OKCANCEL, buttonText: new Object({ok: "Si", cancel: "No"}), fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando provincia' + (n === 1 ? '' : 'es') + '...');
                        store.sync({
                            success: function () {
                                grid.setLoading(false);
                                Ext.Msg.show({title: 'Informaci\u00f3n', msg: 'Registros eliminados exitosamente', icon: Ext.Msg.INFO, buttons: Ext.Msg.OK});
                            },
                            failure: function (action) {
                                store.rejectChanges();
                                Ext.Msg.show({title: 'Informaci\u00f3n', msg: action.proxy.reader.jsonData.msg, icon: Ext.Msg.INFO, buttons: Ext.Msg.OK});
                                grid.setLoading(false);
                            }
                        });
                    }
                }
            });
        } else {
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: 'No existen filas seleccionadas', buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
        }
    },
    eliminarTeclaMunicipio: function (grid, td, cellIndex, record, tr, rowIndex, e) {
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
    actualizarMunicipio: function (bot) {
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
    }
});