Ext.define('Registro.controller.RecursoControl', {
    extend: 'Ext.app.Controller',
    views: ['recurso.GridRecurso', 'recurso.NuevoRecurso', 'recurso.ModificarRecurso', 'recurso.Form'],
    stores: ['Recursos'],
    models: ['Recurso'],
    refs: [{
            ref: 'grid',
            selector: 'gridRecurso'
        }],
    init: function () {
        this.control({
            'gridRecurso button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoRecurso button[action=insertar]': {
                click: this.insertar
            },
            'gridRecurso': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarRecurso button[action=modificar]': {
                click: this.modificar
            },
            'gridRecurso button[action=eliminar]': {
                click: this.eliminar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoRecurso');
        win.show(button);
    },
    insertar: function (buton) {
        var me = this;
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getRecursosStore();
            valores = basicForm.getValues();
            reg = store.findRecord('nombre', valores.nombre);
            if (reg !== null) {
                reg.set('cantidadRestante', parseInt(reg.get('cantidadRestante')) + parseInt(valores.cantidadRestante));
                reg.get('tarjetasEstibas').push({recurso: {idRecurso: reg.get('idRecurso')}, cantidad: valores.cantidadRestante});
                win.setLoading('Actualizando recurso...');
                console.log(reg);
            } else {
                record = Ext.create('Registro.model.Recurso', valores);
                store.add(record);
                win.setLoading('Insertando recurso...');
            }
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Recurso insertado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    me.getController('TarjetaEstibaControl').getTarjetaEstibasStore().load();
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
        win = Ext.widget('modificarRecurso').show(grid);
        win.down('form').loadRecord(record);
    },
    modificar: function (button) {
        var me = this;
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getRecursosStore();
            if (record.dirty)
                win.setLoading('Modificando recurso...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Recurso guardado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    me.getController('TarjetaEstibaControl').getTarjetaEstibasStore().load();
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
            store = this.getRecursosStore();
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
                        grid.setLoading('Eliminando Recurso' + (n === 1 ? '' : 'es') + '...');
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