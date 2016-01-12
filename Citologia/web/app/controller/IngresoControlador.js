Ext.define('Citologia.controller.IngresoControlador', {
    extend: 'Ext.app.Controller',
    views: ['ingreso.GridIngreso', 'ingreso.InsertarIngreso', 'ingreso.EditarIngreso', 'ingreso.BuscarIngreso'],
    stores: ['Ingresos', 'Camas', 'Salas'],
    models: ['Ingreso', 'Cama', 'Sala'],
    refs: [{
            ref: 'listaIngresos',
            selector: 'aliasgridingresos'
        }],
    init: function () {
        this.control({
            'aliasingresoadd button[action=save]': {
                click: this.guardar
            },
            'aliasgridingresos': {
                itemdblclick: this.editar,
                itemcontextmenu: this.itemcontextmenu
            },
            'aliaseditarIngreso button[action=modificar]': {
                click: this.modificar
            },
            'aliasgridingresos button[action=delete]': {
                click: this.eliminar
            },
            'aliasgridingresos button[action=buscar]': {
                click: this.buscar
            },
            'aliasingresoadd combo[action=seleccionar],aliaseditarIngreso combo[action=seleccionar]': {
                select: this.seleccionarSala
            },
            'aliasgridingresos button[action=reporte]': {
                click: this.reportar
            },
            'gridingresosreportes button[action=reporte]': {
                click: this.reportar
            },
            'gridingresosreportes button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    reportar: function (buton) {
        formulario = Ext.create('Ext.form.Panel');
        bform = formulario.getForm();
        valor = buton.getId();
        if (valor === 'pdf') {
            window.open('reporteIngreso/pdf/ingreso', '_new');
        } else
            bform.submit({
                standardSubmit: true,
                url: 'reporteIngreso/' + valor + '/ingreso'
            });
    },
    guardar: function (boton) {
        win = boton.up('aliasingresoadd');
        form = win.down('form');
        datosForm = form.getForm();

        if (datosForm.isValid()) {
            store = this.getIngresosStore();
            valores = form.getValues();
            valores.meridiano = valores.meridiano === 'true' ? true : false;
            camaHab = valores.cama.habilitada;
            if (camaHab === true) {
                Ext.Msg.show({
                    title: 'Informaci\u00f3n',
                    msg: 'La cama ya está siendo usada',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            } else {
                valores.paciente = win.getRegistro().data;
                record = Ext.create('Citologia.model.Ingreso', valores);
                store.add(record);
                win.setLoading("Insertando Ingreso...");
                store.sync({
                    success: function () {
                        win.setLoading(false);
                        storePac = Ext.getStore('Pacientes');
                        storePac.load();
                        storeCama = Ext.getStore('Camas');
                        recordcama = storeCama.findRecord('idCama', valores.cama.idCama);
                        recordcama.set('habilitada', true);
                        storeCama.sync({
                            failure: function (a) {
                                storeCama.rejectChanges();
                                win.setLoading(false);
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: a.proxy.reader.jsonData.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        });
                        Ext.Msg.show({
                            title: 'Informaci\u00f3n',
                            msg: 'Ingreso guardado correctamente',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        store.load();
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
        }
        else {
            Ext.Msg.alert('¡Alerta!', 'El formulario contiene errores. Por favor, revíselo.');
        }
    },
    editar: function (grid, record) {
        view = Ext.widget('aliaseditarIngreso');
        view.show(grid);
        paciente = record.get('paciente');
        form = view.down('form');
        form.loadRecord(record);
        comboSala = form.down('[name=sala]');
        stsal = this.getSalasStore();
        comboCama = comboSala.next();
        storeCama = comboCama.getStore();
        comboCama.select(storeCama.getById(record.get('cama').idCama));
        comboSala.select(stsal.getById(record.get('cama').sala.idSala));

        historiaComp = form.down('[name=historiaClinica]');
        historiaComp.setValue(paciente.historiaClinica);
        nombre = historiaComp.next();
        nombre.setValue(paciente.nombre);
        apellido1 = nombre.next();
        apellido1.setValue(paciente.primerApellido);
        apellido2 = apellido1.next();
        apellido2.setValue(paciente.segundoApellido);

        storeCama.clearFilter();
        storeCama.filter({filterFn: function (reg) {
                return record.get('cama').sala.idSala === reg.get('sala').idSala;
            }});
    },
    modificar: function (boton) {
        win = boton.up('aliaseditarIngreso');
        form = win.down('form');
        record = form.getRecord();
        bform = form.getForm();
        if (bform.isValid()) {
            store = this.getIngresosStore();
            valores = form.getValues();
//            valores.cama.habilitada = false;
            camaVieja = record.get('cama');
            camaNueva = valores.cama;
            record.set(valores);
            if (record.dirty) {
                win.setLoading("Actualizando Ingreso...");
            }
            var me = this;
            store.sync({
                success: function () {
                    win.setLoading(false);
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Ingreso actualizado correctamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    storeCama = me.getCamasStore();
                    storeCama.clearFilter();
                    recordcama = storeCama.getById(camaVieja.idCama);
                    recordcama.set('habilitada', false);
                    recordcama = storeCama.getById(camaNueva.idCama);
                    recordcama.set('habilitada', true);
                    storeCama.sync({
                        failure: function (a) {
                            storeCama.rejectChanges();
                            win.setLoading(false);
                            Ext.Msg.show({
                                title: 'Informaci\u00f3n',
                                msg: a.proxy.reader.jsonData.msg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                    store.load();
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
        } else {
            Ext.Msg.alert('Error', 'Debe llenar todos los campos');
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
                icon: Ext.MessageBox.WARNING,
                scope: this,
                width: 400,
                fn: function (btn, ev) {
                    if (btn === 'yes') {
                        store.remove(records);
                        grid.setLoading("Eliminando Ingreso...");
                        store.sync({
                            success: function () {
                                grid.setLoading(false);
                                storePac = Ext.getStore('Pacientes');
                                storePac.load();
                                Ext.Msg.show({
                                    title: 'Informaci\u00f3n',
                                    msg: 'Ingreso eliminado correctamente',
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
    itemcontextmenu: function (view, rec, node, index, e) {
        e.stopEvent();
        contextMenu = Ext.create('Ext.menu.Menu', {
            items: [{
                    text: 'Nuevo Traslado',
                    action: 'nuevotraslado',
                    iconCls: 'nuevotraslado'
                }, {
                    text: 'Nuevo Egreso',
                    action: 'nuevoegreso',
                    iconCls: 'nuevoegreso'
                }]
        });
        contextMenu.showAt(e.getXY());
        grid = view.up();
        modeloSeleccion = grid.getSelectionModel();
        modeloSeleccion.select(rec);
    },
    seleccionarSala: function (combo) {
        comboCama = combo.next();
        idSala = combo.getValue().idSala;
        comboCama.clearValue();
        storeCama = comboCama.getStore();
        storeCama.clearFilter();
        storeCama.filter({
            filterFn: function (reg) {
                return reg.get('sala').idSala === idSala;
            }});
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
    },
    getIngreso: function () {
        return this.ingreso;
    },
    setIngreso: function (ingreso) {
        this.ingreso = ingreso;
    },
    limpiarCombo: function (combo) {
        combo.getStore().clearFilter();
    }
});

