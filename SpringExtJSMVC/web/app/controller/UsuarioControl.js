Ext.define('CRUD.controller.UsuarioControl', {
    extend: 'Ext.app.Controller',
    views: ['usuario.GridUsuario', 'usuario.NuevoUsuario', 'usuario.ModificarUsuario', 'usuario.BuscarUsuario', 'usuario.RegistroCurso'],
    stores: ['Usuarios', 'Departamentos', 'Facultades', 'Sedes'],
    models: ['Usuario', 'Departamento', 'Facultad', 'Sede'],
    refs: [{
            ref: 'grid',
            selector: 'gridusuario'
        }],
    init: function () {
        this.control({
            'gridusuario button[action=nuevo]': {
                click: this.nuevo
            },
            'gridusuario button[action=registrar]': {
                click: this.registrar
            },
            'nuevoUsuario button[action=insertar]': {
                click: this.insertar
            },
            'nuevoRegistroCurso button[action=insertar]': {
                click: this.registrarEnCurso
            },
            'gridusuario': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarUsuario button[action=modificar]': {
                click: this.modificar
            },
            'gridusuario button[action=eliminar]': {
                click: this.eliminar
            },
            'buscarUsuario button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoUsuario');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getUsuariosStore();
            valores = basicForm.getValues();
            record = Ext.create('CRUD.model.Usuario', valores);
            store.add(record);
            win.setLoading('Insertando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Usuario insertada exitosamente',
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
        win = Ext.widget('modificarUsuario').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        form.down('[name=rol]').select(record.getRol());
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getUsuariosStore();
            if (record.dirty)
                win.setLoading('Modificando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Usuario guardada exitosamente',
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
            store = this.getUsuariosStore();
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
                        grid.setLoading('Eliminando usuario' + (n === 1 ? '' : 'es') + '...');
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
    buscar: function (b) {
        form = b.up('form');
        store = this.getUsuariosStore();
        store.load({
            params: {
                parametros: Ext.encode(form.getValues()),
                sort: 'usuario,apellidos,asc',
                dateFormat: 'dd/MM/yyyy'
            }
        });
    },
    registrar: function (bot) {
        win = Ext.widget('nuevoRegistroCurso');
        form = win.down('form');
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length !== 0) {
            record = seleccion[0];
            form.loadRecord(record);
            win.show(bot);
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'No hay usuarios seleccionados',
                buttons: Ext.Msg.OK
            });
        }
    },
    registrarEnCurso: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getUsuariosStore();
            valores = form.getValues();
            record = form.getRecord();
            record.cursosStore.removeAll();
            record.cursosStore.add(valores.cursos);
            record.set(valores);
            if (record.dirty) {
                win.setLoading('Insertando cursos a usuario...');
                store.sync({
                    success: function () {
                        Ext.Msg.show({
                            title: 'Informaci\u00f3n',
                            msg: 'Cursos insertados exitosamente',
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
                        record.cursosStore.rejectChanges();
                    }
                });
            }
        } else
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'El formulario contiene errores',
                buttons: Ext.Msg.OK
            });
    }
});
