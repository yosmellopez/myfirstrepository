Ext.define('Citologia.controller.PacienteControl', {
    extend: 'Ext.app.Controller',
    views: ['paciente.NuevoPaciente', 'paciente.ModificarPaciente', componente, 'paciente.BusquedaPaciente'],
    stores: ['Pacientes', 'Consultorios', 'AreasSalud', 'Provincias', 'Municipios'],
    models: ['Paciente', 'Consultorio', 'AreaSalud', 'Provincia', 'Municipio'],
    refs: [{
            ref: 'grid',
            selector: vista
        }],
    paciente: {},
    init: function () {
        this.control({
            'gridPaciente button[action=nuevo],gridPacienteIngresado button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoPaciente button[action=insertar]': {
                click: this.insertar
            },
            'nuevoPaciente combo[action=filtrarMunicipios],modificarPaciente combo[action=filtrarMunicipios],busquedaPaciente combo[action=filtrarMunicipios]': {
                select: this.filtrarMunicipios
            },
            'nuevoPaciente combo[action=filtrarConsultorios],modificarPaciente combo[action=filtrarConsultorios],busquedaPaciente combo[action=filtrarConsultorios]': {
                select: this.filtrarConsultorios
            },
            'gridPaciente,gridPacienteIngresado': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla,
                itemmouseenter: this.mostrarTip,
                itemcontextmenu: this.mostrarMenu
            },
            'modificarPaciente button[action=modificar]': {
                click: this.modificar
            },
            'gridPaciente button[action=eliminar],gridPacienteIngresado button[action=eliminar]': {
                click: this.eliminar
            },
            'gridPaciente button[action=editar],gridPacienteIngresado button[action=editar]': {
                click: this.actualizar
            },
            'menu menuitem[action=menuAction]': {
                click: this.realizarAccion
            },
            'busquedaPaciente button[action=buscar]': {
                click: this.buscar
            },
            'gridPacienteIngresado button[action=ingresar]': {
                click: this.ingresarPaciente
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
            record = Ext.create('Citologia.model.Paciente', valores);
            store.add(record);
            win.setLoading('Insertando paciente...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        msg: 'Paciente insertado exitosamente',
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
        win = Ext.widget('modificarPaciente').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        cmbArea = form.queryById('areaSalud');
        cmbArea.select(cmbArea.getStore().getById(record.get('consultorio').areaSalud.idAreaSalud));
        cmbProvincia = form.queryById('provincia');
        cmbProvincia.select(cmbProvincia.getStore().getById(record.get('municipio').provincia.idProvincia));
        cmbMunicipio = cmbProvincia.next();
        storeMunicipio = cmbMunicipio.getStore();
        storeMunicipio.clearFilter();
        storeMunicipio.filter({
            filterFn: function (reg) {
                return reg.get('provincia').idProvincia === record.get('municipio').provincia.idProvincia;
            }
        });
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            valores.detencionPrecoz = valores.detencionPrecoz === true ? true : false;
            record.set(valores);
            store = this.getPacientesStore();
            if (record.dirty)
                win.setLoading('Modificando paciente...');
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
            Ext.Msg.show({title: 'Informaci\u00f3n', icon: Ext.Msg.INFO, msg: 'Debe verificar los campos', buttons: Ext.Msg.OK});
        }
    },
    eliminar: function () {
        grid = this.getGrid();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getPacientesStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: mensaje, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.OKCANCEL, buttonText: new Object({ok: "Si", cancel: "No"}), fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando paciente' + (n === 1 ? '' : 'es') + '...');
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
    },
    filtrarConsultorios: function (combo) {
        cmbConsultorios = combo.next();
        cmbConsultorios.clearValue();
        store = cmbConsultorios.getStore();
        store.clearFilter();
        store.filter({
            filterFn: function (reg) {
                return reg.get('areaSalud').idAreaSalud === combo.getValue();
            }
        });
    },
    mostrarTip: function (view, record) {
        var tooltip = Ext.getCmp('tooltip');
        if (tooltip !== undefined) {
            tooltip.update(record.data);
        } else {
            tooltip = Ext.create('Ext.tip.ToolTip', {
                target: view.el,
                delegate: view.itemSelector,
                title: '<span style="font-size:20px;">Datos Personales</span>',
                id: 'tooltip',
                cls: 'x-btn-green',
                trackMouse: true,
                tpl: Ext.create("Ext.XTemplate",
                        'Nombre y Apellidos: {nombre} {primerApellido} {segundoApellido}<br>',
                        'No. Identidad: {ci}<br>',
                        'Historia Cl\u00ednica: {historiaClinica}<br>', 'Edad: {edad} <br>'
                        ),
                data: record.data,
                bodyStyle: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fontFamily: 'helvetica,arial,verdana,sans-serif'
                }
            });
        }
    },
    mostrarMenu: function (grid, record, item, index, e, eOpts) {
        e.stopEvent();
        menu = Ext.create('Ext.menu.Menu', {
            items: [{
                    text: 'Insertar Prueba',
                    iconCls: 'addUser',
                    action: 'menuAction',
                    accion: 1
                }, {
                    text: 'Eliminar Paciente',
                    iconCls: 'eliminar',
                    action: 'menuAction',
                    accion: 2
                }, {
                    text: 'Modificar Paciente',
                    iconCls: 'modificar',
                    action: 'menuAction',
                    accion: 3
                }]
        });
        menu.showAt(e.getXY());
    },
    realizarAccion: function (menu) {
        record = this.getGrid().getSelectionModel().getSelection()[0];
        switch (menu.accion) {
            case 1:
                this.paciente = record;
                this.getController('TarjetaPruebaControl').nuevo(menu, record);
                break;
            case 2:
                this.eliminar();
                break;
            case 3:
                this.editar(menu, record);
                break;
        }
    },
    filtrarMunicipios: function (combo) {
        cmbMunic = combo.next();
        cmbMunic.clearValue();
        store = cmbMunic.getStore();
        store.clearFilter();
        store.filter({
            filterFn: function (reg) {
                return reg.get('provincia').idProvincia === combo.getValue().idProvincia;
            }
        });
    },
    buscar: function (bot) {
        form = bot.up('form');
        valores = form.getValues();
        grid = this.getGrid();
        st = grid.getStore();
        st.load({
            params: {parametros: Ext.encode(valores)}
        });
    },
    ingresarPaciente: function (boton) {
        grid = this.getGrid();
        elementos = grid.getSelectionModel().getSelection();
        win = Ext.widget('aliasingresoadd');
        form = win.down('form');
        record = elementos[0];
        if (!record.get('ingresado')) {
            form.loadRecord(record);
            win.show(boton);
            win.setRegistro(record);
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'El paciente ya esta ingresado',
                buttons: Ext.Msg.OK
            });
        }
    }
});