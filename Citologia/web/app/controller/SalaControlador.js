Ext.define('Citologia.controller.SalaControlador', {
    extend: 'Ext.app.Controller',
    views: ['sala.GridSala', 'sala.InsertarSala', 'sala.EditarSala', 'sala.BuscarSala'],
    stores: ['Salas'],
    models: ['Sala'],
    init: function () {
        this.control({
            'aliasgridsalas button[action=add]': {
                click: this.anadir
            },
            'aliasgridsalas button[action=delete]': {
                click: this.eliminar
            },
            'aliassalaadd button[action=save]': {
                click: this.guardar
            },
            'aliasgridsalas': {
                itemdblclick: this.editar
            },
            'aliaseditarsala button[action=modificar]': {
                click: this.modificar
            },
            'aliasgridsalas button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    anadir: function (boton) {
        win = Ext.widget('aliassalaadd');
        win.show(boton);
    },
    guardar: function (boton) {
        win = boton.up('aliassalaadd');
        form = win.down('form');
        datosForm = form.getForm();
        if (datosForm.isValid()) {
            store = this.getSalasStore();
            valores = form.getValues();
            record = Ext.create('Citologia.model.Sala', valores);
            store.add(record);
            win.setLoading("Insertando Sala...");
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Sala registrada correctamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (a) {
                    store.rejectChanges();
                    win.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: a.proxy.reader.jsonData.msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
        else {
            Ext.Msg.alert('¡Alerta!', 'El formulario contiene errores. Por favor, revíselo.');
        }
    },
    eliminar: function (boton) {
        grid = boton.up('grid');
        store = grid.getStore();
        records = grid.getSelectionModel().getSelection();

        if (records.length === 0)
            Ext.Msg.alert('¡Alerta!', 'No hay ninguna fila seleccionada');
        else {
            Ext.Msg.show({
                title: 'Confirmación',
                msg: '¿Está seguro de que desea borrar el registro seleccionado?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.INFO,
                scope: this,
                width: 400,
                fn: function (btn, ev) {
                    if (btn === 'yes') {
                        store.remove(records);
                        grid.setLoading("Eliminando Sala...");
                        store.sync({
                            success: function () {
                                grid.setLoading(false);
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: 'Sala eliminado correctamente',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            failure: function (a) {
                                store.rejectChanges();
                                grid.setLoading(false);
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: a.proxy.reader.jsonData.msg,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    editar: function (grid, record) {
        view = Ext.widget('aliaseditarsala');
        form = view.down('form');
        form.loadRecord(record);
        view.show(grid);
    },
    modificar: function (boton) {
        ventana = boton.up('aliaseditarsala');
        form = ventana.down('form');
        record = form.getRecord();
        bform = form.getForm();
        if (bform.isValid()) {
            store = this.getSalasStore();
            valores = form.getValues();
            grid2 = Ext.getCmp('grid2');
            storeEsp = grid2.getStore();
            seleccion = new Array();
            storeEsp.each(function (arg) {
                seleccion.push(arg.raw);
            });
            record.set(valores);
            record.set('especialidadList', seleccion);
            ventana.setLoading("Actualizando Sala...");
            store.sync({
                success: function () {
                    store.load();
                    ventana.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Sala actualizada correctamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    ventana.close();
                },
                failure: function (a) {
                    ventana.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: a.proxy.reader.jsonData.msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
        else {
            Ext.Msg.alert('Error', 'Debe llenar todos los campos');
        }
    },
    buscar: function (boton) {
        grid = boton.up('grid');
        form = boton.up('panel').down('form');
        valores = form.getValues();
        store = grid.getStore();
        parametros = Ext.encode(valores);
        store.load({
            params: {parametros: parametros}
        });
    }
});
