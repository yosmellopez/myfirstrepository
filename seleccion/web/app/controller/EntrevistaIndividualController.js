Ext.define('Seleccion.controller.EntrevistaIndividualController', {
    extend: 'Ext.app.Controller',
    views: ['entrevistaIndividual.GridEntrevistaIndividual', 'entrevistaIndividual.InsertarEntrevistaIndividual', 'entrevistaIndividual.ModificarEntrevistaIndividual', ],
    stores: ['EntrevistasIndividuales', 'NivelesEscolares', 'Aspirantes', 'Convivencias', 'IntegracionesRevolucionarias'],
    models: ['EntrevistaIndividual', 'NivelEscolar', 'Aspirante', 'Convivencia', 'IntegracionRevolucionaria'],
    refs: [{
            ref: 'grid',
            selector: 'gridEntrevistaIndividual'
        }],
    init: function () {
        this.control({
            'gridEntrevistaIndividual button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarEntrevIndiv button[action=insertar],insertarEntrevIndiv button[action=finalizar]': {
                click: this.insertar
            },
            'insertarEntrevIndiv grid[action=ver],insertarEntrevIndiv button[action=verificar]': {
                drop: this.validarDrop,
                click: this.validarDrop
            },
            'gridEntrevistaIndividual': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarEntrevIndiv button[action=insertar],modificarEntrevIndiv button[action=finalizar]': {
                click: this.modificar
            },
            'gridEntrevistaIndividual button[action=eliminar]': {
                click: this.eliminar
            },
            'insertarEntrevIndiv textfield[action=escribir],modificarEntrevIndiv textfield[action=escribir]': {
                keyup: this.validarBoton
            },
            'insertarEntrevIndiv combo[action=escribir],modificarEntrevIndiv combo[action=escribir]': {
                select: this.validarBoton
            },
            'insertarEntrevIndiv button[action=atras],modificarEntrevIndiv button[action=atras]': {
                click: this.atras
            },
            'gridEntrevistaIndividual button>menu>menuitem[action=generar]': {
                click: this.generarReporte
            }
        });
    },
    validarBoton: function (text) {
        win = text.up('window');
        container = win.down('form');
        valido = true;
        vm = win.getViewModel();
        switch (win.paso) {
            case 1:
                valido = container.isValid();
                break;
            case 2:
                grid = container.queryById('gridConvivencia');
                st = grid.getStore();
                valido = st.count() !== 0;
                break;
            case 3:
                grid = container.queryById('gridResidencia');
                st = grid.getStore();
                valido = st.count() !== 0;
                break;
            case 4:
                valido = container.isValid();
                break;
        }
        vm.setData({accion: 'insertar', iconoFinalizar: 'icon-arrow-right', botonValido: valido});
    },
    nuevo: function (button) {
        win = Ext.widget('insertarEntrevIndiv');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        var layout = form.getLayout();
        if (!layout.getNext()) {
            basicForm = form.getForm();
            if (basicForm.isValid()) {
                store = this.getEntrevistasIndividualesStore();
                gridConvivencia = form.queryById('gridConvivencia');
                storeConv = gridConvivencia.getStore();
                gridResidencia = form.queryById('gridResidencia');
                storeResid = gridResidencia.getStore();
                v = basicForm.getValues();
                v.convivencias = storeConv.getDatos();
                v.residencias = storeResid.getDatos();
                record = Ext.create('Seleccion.model.EntrevistaIndividual', v);
                store.add(record);
                win.setLoading('Insertando entrevista individual...');
                store.sync({
                    success: function () {
                        Ext.Msg.show({
                            title: 'Informaci\u00f3n',
                            msg: 'entrevista individual insertada exitosamente',
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
        } else {
            viewModel = win.getViewModel();
            win.paso++;
            if (win.paso === 4) {
                gridselectfield = win.queryById('gridselectfield');
                gridselectfield.setDisabled(false);
            }
            progress = win.queryById('progress');
            layout['next']();
            buton.setText(layout.getNext() ? 'Siguiente' : 'Finalizar');
            buton.previousSibling().setDisabled(!layout.getPrev());
            this.validarBoton(buton);
            viewModel.setData({
                accion: layout.getNext() ? 'insertar' : 'finalizar',
                iconoFinalizar: layout.getNext() ? 'icon-arrow-right' : 'icon-ok-sign',
                step0: win.paso === 1,
                step1: win.paso === 2,
                step2: win.paso === 3,
                step3: win.paso === 4
            });
        }
    },
    editar: function (grid, record) {
        win = Ext.widget('modificarEntrevIndiv');
        container = win.down('form');
        valido = container.isValid();
        vm = win.getViewModel();
        vm.setData({accion: 'insertar', iconoFinalizar: 'icon-arrow-right', botonValido: valido});
        form = win.down('form');
        form.loadRecord(record);
        form.down('[name=aspirante]').select(record.getAspirante());
        form.down('[name=nivelEscolar]').select(record.getNivelEscolar());
        gridConvivencia = form.queryById('gridConvivencia');
        storeConv = gridConvivencia.getStore();
        storeConv.add(record.get('convivencias'));
        gridResidencia = form.queryById('gridResidencia');
        storeResid = gridResidencia.getStore();
        storeResid.add(record.get('residencias'));
        win.show(grid);
        gridSelect = form.queryById('gridSeleccion');
        gridSelectGen = form.queryById('gridHabilitados');
        stGen = gridSelectGen.getStore();
        stSelect = gridSelect.getStore();
        stIntegraciones = record.integracionesRevolucionarias();
        stSelect.add(stIntegraciones.getRange());
        elems = Array();
        stGen.each(function (reg) {
            if (stSelect.getById(reg.getId()) !== null) {
                elems.push(reg);
            }
        });
        stGen.remove(elems);
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        var layout = form.getLayout();
        if (!layout.getNext()) {
            basicForm = form.getForm();
            if (basicForm.isValid()) {
                store = this.getEntrevistasIndividualesStore();
                gridConvivencia = form.queryById('gridConvivencia');
                storeConv = gridConvivencia.getStore();
                gridResidencia = form.queryById('gridResidencia');
                storeResid = gridResidencia.getStore();
                v = basicForm.getValues();
                v.convivencias = storeConv.getDatos();
                v.residencias = storeResid.getDatos();
                record = form.getRecord();
                record.set(v);
                if (record.dirty) {
                    win.setLoading('Insertando entrevista individual...');
                }
                store.sync({
                    success: function () {
                        Ext.Msg.show({
                            title: 'Informaci\u00f3n',
                            msg: 'entrevista individual insertada exitosamente',
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
        } else {
            viewModel = win.getViewModel();
            win.paso++;
            layout['next']();
            button.setText(layout.getNext() ? 'Siguiente' : 'Finalizar');
            button.previousSibling().setDisabled(!layout.getPrev());
            if (win.paso === 4) {
                gridselectfield = win.queryById('gridselectfield');
                gridselectfield.setDisabled(false);
            }
            viewModel.setData({
                accion: layout.getNext() ? 'insertar' : 'finalizar',
                iconoFinalizar: layout.getNext() ? 'icon-arrow-right' : 'icon-ok-sign',
                step0: win.paso === 1,
                step1: win.paso === 2,
                step2: win.paso === 3,
                step3: win.paso === 4
            });
        }
    },
    eliminar: function () {
        grid = this.getGrid();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getEntrevistasIndividualesStore();
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
                        grid.setLoading('Eliminando entrevistaIndividual' + (n === 1 ? '' : 'es') + '...');
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
    atras: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        win.paso--;
        var layout = form.getLayout();
        layout['prev']();
        buton.setDisabled(!layout.getPrev());
        buton.next().setText(layout.getNext() ? 'Siguiente' : 'Finalizar');
        viewModel = win.getViewModel();
        viewModel.setData({
            accion: layout.getNext() ? 'insertar' : 'finalizar',
            iconoFinalizar: layout.getNext() ? 'icon-arrow-right' : 'icon-ok-sign',
            step0: win.paso === 1,
            step1: win.paso === 2,
            step2: win.paso === 3,
            step3: win.paso === 4
        });
    },
    validarDrop: function () {
        grid = Ext.getCmp('seleccionados');
        win = grid.up('window');
        st = grid.getStore();
        valido = st.count() !== 0;
        vm = win.getViewModel();
        vm.setData({accion: 'insertar', iconoFinalizar: 'icon-ok-sign', botonValido: valido});
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