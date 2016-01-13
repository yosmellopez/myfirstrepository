Ext.define('Seleccion.controller.ControlAspiranteController', {
    extend: 'Ext.app.Controller',
    views: ['controlAspirante.GridControlAspirante', 'controlAspirante.InsertarControlAspirante', 'controlAspirante.ModificarControlAspirante'],
    stores: ['ControlAspirantes', 'Aspirantes'],
    models: ['ControlAspirante', 'Aspirante', 'Observacion'],
    refs: [{
            ref: 'grid',
            selector: 'gridControlAspirante'
        }],
    init: function () {
        this.control({
            'gridControlAspirante button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarControlAspirante button[action=insertar]': {
                click: this.insertar
            },
            'gridControlAspirante': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarControlAspirante button[action=modificar]': {
                click: this.modificar
            },
            'gridControlAspirante button[action=eliminar]': {
                click: this.eliminar
            },
            'gridControlAspirante button>menu>menuitem[action=generar]': {
                click: this.generarReporte
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('insertarControlAspirante');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getControlAspirantesStore();
            v = basicForm.getValues();
            v.observacion = {fechaPresentacion: v.fechaPresentacion, fechaBaja: v.fechaBaja, motivoBaja: v.motivoBaja};
            record = Ext.create('Seleccion.model.ControlAspirante', v);
            store.add(record);
            win.setLoading('Insertando control de aspirante...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'ControlAspirante insertada exitosamente',
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
        win = Ext.widget('modificarControlAspirante').show(grid);
        form = win.down('form');
        form.cargarRecord(record);
        form.down('[name=aspirante]').select(record.getAspirante());
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getControlAspirantesStore();
            if (record.dirty)
                win.setLoading('Insertando controlAspirante...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'ControlAspirante guardada exitosamente',
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
            store = this.getControlAspirantesStore();
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
                        grid.setLoading('Eliminando controlAspirante' + (n === 1 ? '' : 'es') + '...');
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
    generarReporte: function (item) {
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length !== 0) {
            record = seleccion[0];
            window.open('../' + item.formato + '/' + record.getId() + '/controlAspirante', '_new');
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


