Ext.define('Citologia.controller.CamaControlador', {
    extend: 'Ext.app.Controller',
    views: ['cama.GridCama', 'cama.EditarCama', 'cama.InsertarCama', 'cama.BuscarCama'],
    models: ['Cama'],
    stores: ['Camas'],
    init: function() {
        this.control({
            'aliasgridcamas': {
                itemdblclick: this.editar
            },
            'aliaseditarcama button[action=modificar]': {
                click: this.modificar
            },
            'aliasgridcamas button[action=add]': {
                click: this.anadir
            },
            'aliascamaadd button[action=save]': {
                click: this.guardar
            },
            'aliasgridcamas button[action=buscar]': {
                click: this.buscar,
                expand: this.limpiarCombo
            },
            'aliasgridcamas button[action=delete]': {
                click: this.eliminar
            }
        });
    },
    eliminar: function(boton) {
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
                icon: Ext.MessageBox.WARNING,
                scope: this,
                width: 400,
                fn: function(btn, ev) {
                    if (btn === 'yes') {
                        store.remove(records);
                        grid.setLoading("Eliminando Cama...");
                        store.sync({
                            success: function() {
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: 'Cama eliminada correctamente',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                grid.setLoading(false);
                            },
                            failure: function(a) {
                                store.rejectChanges();
                                json = a.proxy.reader.jsonData;
                                grid.setLoading(false);
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: json.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    limpiarCombo: function(combo) {
        combo.getStore().clearFilter();
    },
    buscar: function(boton) {
        grid = boton.up('grid');
        form = boton.up('panel').down('form');
        valores = form.getValues();
        store = grid.getStore();
        parametros = Ext.encode(valores);
        store.load({
            params: {parametros: parametros}
        });
    },
    editar: function(grid, record) {
        view = Ext.widget('aliaseditarcama');
        view.show(grid);
        form = view.down('form');
        form.loadRecord(record);
    },
    modificar: function(boton) {
        win = boton.up('aliaseditarcama');
        form = win.down('form');
        record = form.getRecord();
        bform = form.getForm();
        if (bform.isValid()) {
            store = this.getCamasStore();
            valores = form.getValues();
            record.set(valores);
            if(record.dirty){
                win.setLoading('Modificando cama...');
            }
            store.sync({
                success: function() {
                    win.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Cama modificada correctamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function(a) {
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
        } else {
            Ext.Msg.alert('Error', 'Debe llenar todos los campos');
        }
    },
    anadir: function(boton) {
        win = Ext.widget('aliascamaadd');
        win.show(boton);
    },
    guardar: function(boton) {
        win = boton.up('aliascamaadd');
        form = win.down('form');
        datosForm = form.getForm();
        if (datosForm.isValid()) {
            store = this.getCamasStore();
            valores = form.getValues();
            record = Ext.create('Citologia.model.Cama', valores);
            store.add(record);
            win.setLoading("Insertando Cama...");
            store.sync({
                success: function() {
                    win.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Cama registrado correctamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function(a) {
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
        else
            Ext.Msg.alert('¡Alerta!', 'El formulario contiene errores. Por favor, revíselo.');
    }
});


