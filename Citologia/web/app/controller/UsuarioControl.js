Ext.define('Citologia.controller.UsuarioControl', {
    extend: 'Ext.app.Controller',
    views: ['usuario.NuevoUsuario', 'usuario.ModificarUsuario', 'usuario.GridUsuario'],
    stores: ['Usuarios', 'Roles'],
    models: ['Usuario', 'Rol'],
    refs: [{
            ref: 'grid',
            selector: 'gridUsuario'
        }],
    init: function () {
        this.control({
            'gridUsuario button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoUsuario button[action=insertar]': {
                click: this.insertar
            },
            'gridUsuario': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarUsuario button[action=modificar]': {
                click: this.modificar
            },
            'gridUsuario button[action=eliminar]': {
                click: this.eliminar
            },
            'gridUsuario button[action=editar]': {
                click: this.actualizar
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
            valores.contrasenna = hex_sha512(valores.contrasenna);
            record = Ext.create('Citologia.model.Usuario', valores);
            store.add(record);
            win.setLoading('Insertando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        msg: 'Usuario insertado exitosamente',
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
    editar: function (grid, record) {
        win = Ext.widget('modificarUsuario').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        cmbRol = form.down('[name=rol]');
        cmbRol.select(this.getRolesStore().getById(record.get('rol').idRol));
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            if (valores.contrasenna !== '')
                valores.contrasenna = hex_sha512(valores.contrasenna);
            record = form.getRecord();
            record.set(valores);
            store = this.getUsuariosStore();
            if (record.dirty)
                win.setLoading('Modificando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Usuario guardado exitosamente',
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
            store = this.getUsuariosStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: mensaje, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.OKCANCEL, buttonText: new Object({ok: "Si", cancel: "No"}), fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando usuario' + (n === 1 ? '' : 'es') + '...');
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
    }
});