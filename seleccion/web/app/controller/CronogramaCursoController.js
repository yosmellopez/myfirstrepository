Ext.define('Seleccion.controller.CronogramaCursoController', {
    extend: 'Ext.app.Controller',
    views: ['cronogramaCurso.GridCronogramaCurso', 'cronogramaCurso.InsertarCronogramaCurso', 'cronogramaCurso.ModificarCronogramaCurso', 'cronogramaCurso.InsertarAspirantes', 'cronogramaCurso.BusquedaCronogramaCurso'],
    stores: ['CronogramasCursos', 'TiposCursos', 'Aspirantes'],
    models: ['CronogramaCurso', 'TipoCurso', 'Aspirante'],
    refs: [{
            ref: 'grid',
            selector: 'gridCronogramaCurso'
        }],
    init: function () {
        this.control({
            'gridCronogramaCurso button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarCronogramaCurso button[action=insertar]': {
                click: this.insertar
            },
            'gridCronogramaCurso': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarCronogramaCurso button[action=modificar]': {
                click: this.modificar
            },
            'gridCronogramaCurso button[action=eliminar]': {
                click: this.eliminar
            },
            'gridCronogramaCurso button[action=insertarAspirante]': {
                click: this.insertarAspirante
            },
            'insertarAspirantes button[action=insertarAspirante]': {
                click: this.agregarAspirante
            },
            'gridCronogramaCurso button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('insertarCronogramaCurso');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getCronogramasCursosStore();
            valores = basicForm.getValues();
            record = Ext.create('Seleccion.model.CronogramaCurso', valores);
            store.add(record);
            win.setLoading('Insertando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Cronograma curso insertado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    console.log(action);
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
        win = Ext.widget('modificarCronogramaCurso').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        form.down('[name=tipoCurso]').select(record.getTipoCurso());
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getCronogramasCursosStore();
            if (record.dirty)
                win.setLoading('Modificando usuario...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'CronogramaCurso guardada exitosamente',
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
            store = this.getCronogramasCursosStore();
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
    insertarAspirante: function (bot) {
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length !== 0) {
            win = Ext.widget('insertarAspirantes');
            form = win.down('form');
            form.loadRecord(seleccion[0]);
            win.show(bot);
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'Debe seleccionar un registro',
                buttons: Ext.Msg.OK
            });
        }
    },
    agregarAspirante: function (bot) {
        win = bot.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getCronogramasCursosStore();
            aspirantes = record.aspirantes();
            aspirantes.removeAll();
            aspirantes.add(valores.aspirantes);
            if (record.dirty)
                win.setLoading('Agregando aspirantes a cronograma de curso...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Aspirantes a\u00f1adidos al curso exitosamente',
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
    buscar: function (bot) {
        form = bot.up('form');
        values = form.getValues();
        grid = this.getGrid();
        store = grid.getStore();
        store.load({
            params: {
                parametros: Ext.encode(values)
            }
        });
    }
});