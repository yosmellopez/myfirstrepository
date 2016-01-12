Ext.define('Registro.controller.PacienteControl', {
    extend: 'Ext.app.Controller',
    views: ['paciente.GridPaciente', 'paciente.NuevoPaciente', 'paciente.ModificarPaciente', 'paciente.Form', 'paciente.BusquedaPaciente'],
    stores: ['Pacientes', 'AreasSalud', 'ListaEsperas', 'Especialidades', 'Causas'],
    models: ['Paciente', 'AreaSalud', 'ListaEspera', 'Especialidad', 'Causa'],
    refs: [{
            ref: 'grid',
            selector: 'gridPaciente'
        }],
    init: function () {
        this.control({
            'gridPaciente button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoPaciente button[action=insertar]': {
                click: this.insertar
            },
            'gridPaciente': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarPaciente button[action=modificar]': {
                click: this.modificar
            },
            'gridPaciente button[action=eliminar]': {
                click: this.eliminar
            },
            'gridPaciente button[action=nuevaOperacion]': {
                click: this.nuevaOperacion
            },
            'busquedaPaciente button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoPaciente');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getPacientesStore();
            valores = basicForm.getValues();
            record = Ext.create('Registro.model.Paciente', valores);
            store.add(record);
            win.setLoading('Insertando paciente...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Paciente insertado exitosamente',
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
        win = Ext.widget('modificarPaciente').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        form.down('[name=areaSalud]').select(this.getAreasSaludStore().getById(record.get('areaSalud').idAreaSalud));
        form.down('[name=especialidad]').select(Ext.getStore('Especialidades').getById(record.get('especialidad').idEspecialidad));
        form.down('[name=listaEspera]').select(this.getListaEsperasStore().getById(record.get('listaEspera').idListaEspera));
        form.down('[name=causaBaja]').select(Ext.getStore('Causas').getById(record.get('causaBaja').idCausa));
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            record.set(valores);
            store = this.getPacientesStore();
            if (record.dirty)
                win.setLoading('Insertando paciente...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Paciente guardado exitosamente',
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
            store = this.getPacientesStore();
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
                        grid.setLoading('Eliminando paciente' + (n === 1 ? '' : 'es') + '...');
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
    nuevaOperacion: function (bot) {
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length === 0) {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'No se han seleccionados registros',
                buttons: Ext.Msg.OK
            });
        } else {
            win = Ext.widget('nuevoOperacion');
            form = win.down('form');
            pacienteObj = seleccion[0].data;
            form.setRegistroPaciente(pacienteObj);
            form.loadDatosPaciente(pacienteObj);
            win.show(bot);
        }
    },
    buscar: function (bot) {
        form = bot.up('form');
        store = this.getPacientesStore();
        store.load({
            params: {
                parametros: Ext.encode(form.getValues())
            }
        });
    }
});