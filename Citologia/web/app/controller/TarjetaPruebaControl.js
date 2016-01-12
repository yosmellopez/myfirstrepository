Ext.define('Citologia.controller.TarjetaPruebaControl', {
    extend: 'Ext.app.Controller',
    views: ['tarjetaPrueba.NuevaTarjetaPrueba', 'tarjetaPrueba.ModificarTarjetaPrueba', 'tarjetaPrueba.GridTarjetaPrueba', 'tarjetaPrueba.BusquedaTarjetaPrueba'],
    stores: ['TarjetasPruebas', 'Pacientes', 'TiposAnticonceptivos', 'EnfermedadesTransmisionSexual', 'DiagnosticosFinales', 'TiposCasos', 'ResponsablesMuestra'],
    models: ['TarjetaPrueba', 'Paciente', 'TipoAnticonceptivo', 'EnfermedadTransmisionSexual', 'DiagnosticoFinal', 'TipoCaso', 'ResponsableMuestra'],
    refs: [{
            ref: 'grid',
            selector: 'gridTarjetaPrueba'
        }],
    init: function () {
        this.control({
            'nuevaTarjetaPrueba button[action=insertar]': {
                click: this.insertar
            },
            'nuevaTarjetaPrueba checkbox[action=cambiarEstado],modificarTarjetaPrueba checkbox[action=cambiarEstado],busquedaTarjetaPrueba checkbox[action=cambiarEstado]': {
                change: this.cambiarEstado
            },
            'gridTarjetaPrueba': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'gridTarjetaPrueba button[action=eliminar]': {
                click: this.eliminar
            },
            'gridTarjetaPrueba button>menu>menuitem[action=generar]': {
                click: this.generar
            },
            'gridTarjetaPrueba button[action=editar]': {
                click: this.actualizar
            },
            'modificarTarjetaPrueba button[action=modificar]': {
                click: this.modificar
            },
            'busquedaTarjetaPrueba button[action=buscar]': {
                click: this.buscar
            }
        });
    },
    nuevo: function (button, registro) {
        win = Ext.widget('nuevaTarjetaPrueba');
        win.show(button);
        if (registro !== undefined) {
            form = win.down('form');
            form.loadRecord(registro);
        }
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getTarjetasPruebasStore();
            valores = basicForm.getValues();
            valores.paciente = this.getController('PacienteControl').paciente.data;
            valores.antecedente = {edadPrimeraRelacionSexual: valores.edadPrimeraRelacionSexual === undefined ? 0 : valores.edadPrimeraRelacionSexual,
                edadPrimerEmbarazo: valores.edadPrimerEmbarazo === undefined ? 0 : valores.edadPrimerEmbarazo, numeroPartos: valores.numeroPartos === undefined ? 0 : valores.numeroPartos,
                yearMenopausia: valores.yearMenopausia === undefined ? 0 : valores.yearMenopausia, ultimaMestruacion: valores.ultimaMestruacion,
                metrorragia: valores.metrorragia, tipoAnticonceptivo: valores.tipoAnticonceptivo, otros: valores.otros};
            valores.primeraCitologia = {fechaTomaMuestra: valores.fechaTomaMuestra, fechaResultadoFinal: valores.fechaResultadoFinal, diagnosticoFinal: valores.diagnosticoFinal,
                responsablesMuestras: valores.responsablesMuestras};
            record = Ext.create('Citologia.model.TarjetaPrueba', valores);
            record.enfermedadesTransmisionSexuales().loadData(valores.enfermedadesTransmisionSexual);
            record.setDiagnostico(valores.diagnosticoFinal);
            record.responsables().loadData(valores.responsablesMuestras);
            record.setTipoAnticonceptivo(new Citologia.model.TipoAnticonceptivo(valores.tipoAnticonceptivo));
            record.setTipoCaso(new Citologia.model.TipoCaso(valores.tipoCaso));
            store.add(record);
            win.setLoading('Insertando tarjeta de prueba citologica...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        msg: 'Tarjeta de Prueba Citologica insertado exitosamente',
                        title: 'Informaci\u00f3n',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                    console.log(record.getData(true));
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
        if (selecion.length > 1) {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'Debe seleccionar un solo registro para poder modificarlo.',
                buttons: Ext.Msg.OK
            });
        } else if (selecion.length !== 0) {
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
        win = Ext.widget('modificarTarjetaPrueba').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        form.down('[name=nombre]').setValue(record.get('paciente').nombre);
        form.down('[name=primerApellido]').setValue(record.get('paciente').primerApellido);
        form.down('[name=historiaClinica]').setValue(record.get('paciente').historiaClinica);
        form.down('[name=fechaTomaMuestra]').setValue(record.get('primeraCitologia').fechaTomaMuestra);
        form.down('[name=fechaResultadoFinal]').setValue(record.get('primeraCitologia').fechaResultadoFinal);
        diagnostico = form.down('[name=diagnosticoFinal]');
        diagnostico.select(record.getDiagnostico());
        form.down('[name=tipoCaso]').select(record.getTipoCaso());
        responsables = form.down('[name=responsablesMuestras]');
        responsables.select(record.responsables().getRange());
        form.down('[name=edadPrimeraRelacionSexual]').setValue(record.get('antecedente').edadPrimeraRelacionSexual);
        form.down('[name=edadPrimerEmbarazo]').setValue(record.get('antecedente').edadPrimerEmbarazo);
        form.down('[name=numeroPartos]').setValue(record.get('antecedente').numeroPartos);
        form.down('[name=yearMenopausia]').setValue(record.get('antecedente').yearMenopausia);
        form.down('[name=ultimaMestruacion]').setValue(record.get('antecedente').ultimaMestruacion);
        metro = form.down('[name=metrorragia]');
        metro.select(metro.getStore().getById(record.get('antecedente').metrorragia.idMetrorragia));
        form.down('[name=enfermedadesTransmisionSexual]').select(record.enfermedadesTransmisionSexuales().getRange());
        form.down('[name=tipoAnticonceptivo]').select(record.getTipoAnticonceptivo());
        form.down('[name=otros]').setValue(record.get('antecedente').otros);
        form.down('[name=edadPrimeraRelacionSexual]').setDisabled(record.get('antecedente').edadPrimeraRelacionSexual === 0);
        form.down('[name=edadPrimeraRelacionSexual]').previousNode().setValue(record.get('antecedente').edadPrimeraRelacionSexual !== 0);
        form.down('[name=edadPrimerEmbarazo]').setDisabled(record.get('antecedente').edadPrimerEmbarazo === 0);
        form.down('[name=edadPrimerEmbarazo]').previousNode().setValue(record.get('antecedente').edadPrimerEmbarazo !== 0);
        form.down('[name=numeroPartos]').setDisabled(record.get('antecedente').numeroPartos === 0);
        form.down('[name=numeroPartos]').previousNode().setValue(record.get('antecedente').numeroPartos !== 0);
        form.down('[name=yearMenopausia]').setDisabled(record.get('antecedente').yearMenopausia === 0);
        form.down('[name=yearMenopausia]').previousNode().setValue(record.get('antecedente').yearMenopausia !== 0);
    },
    modificar: function (button) {
        win = button.up('window');
        form = win.down('form');
        bform = form.getForm();
        if (bform.isValid()) {
            valores = form.getValues();
            record = form.getRecord();
            valores.antecedente = {edadPrimeraRelacionSexual: valores.edadPrimeraRelacionSexual === undefined ? 0 : valores.edadPrimeraRelacionSexual,
                edadPrimerEmbarazo: valores.edadPrimerEmbarazo === undefined ? 0 : valores.edadPrimerEmbarazo, numeroPartos: valores.numeroPartos === undefined ? 0 : valores.numeroPartos,
                yearMenopausia: valores.yearMenopausia === undefined ? 0 : valores.yearMenopausia, ultimaMestruacion: valores.ultimaMestruacion,
                metrorragia: valores.metrorragia, tipoAnticonceptivo: valores.tipoAnticonceptivo, otros: valores.otros};
            valores.primeraCitologia = {idPrimeraCitologia: record.get('primeraCitologia').idPrimeraCitologia, fechaTomaMuestra: valores.fechaTomaMuestra,
                fechaResultadoFinal: valores.fechaResultadoFinal, diagnosticoFinal: valores.diagnosticoFinal, responsablesMuestras: valores.responsablesMuestras};
            record.set(valores);
            enfermedades = record.enfermedadesTransmisionSexuales();
            enfermedades.removeAll();
            enfermedades.add(valores.enfermedadesTransmisionSexual);
            record.setTipoCaso(this.getTiposCasosStore().getById(valores.tipoCaso.idTipoCaso));
            record.setTipoAnticonceptivo(this.getTiposAnticonceptivosStore().getById(valores.antecedente.tipoAnticonceptivo.idTipoAnticonceptivo));
            store = this.getTarjetasPruebasStore();
            if (record.dirty)
                win.setLoading('Modificando tarjetaPrueba...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Tarjeta Prueba guardada exitosamente',
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
            store = this.getTarjetasPruebasStore();
            n = records.length;
            sp = (records.length === 1 ? ' registro' : ' registros');
            mensaje = 'Est\u00e1 a punto de eliminar ' + n + sp + '</br>¿Desea continuar?';
            Ext.Msg.show({title: 'Informaci\u00f3n', msg: mensaje, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.OKCANCEL, buttonText: new Object({ok: "Si", cancel: "No"}), fn: function (btn) {
                    if (btn === 'ok') {
                        store.remove(records);
                        np = records.length === 1;
                        grid.setLoading('Eliminando tarjeta de prueba citologica' + (n === 1 ? '' : 'es') + '...');
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
    cambiarEstado: function (check, checked) {
        textfield = check.next();
        textfield.setDisabled(!checked);
        textfield.focus();
    },
    buscar: function (boton) {
        grid = boton.up('grid');
        form = boton.up('form');
        valores = form.getValues();
        store = grid.getStore();
        parametros = Ext.encode(valores);
        store.load({
            params: {parametros: parametros}
        });
    },
    generar: function (item) {
        grid = this.getGrid();
        seleccion = grid.getSelectionModel().getSelection();
        if (seleccion.length !== 0) {
            form = Ext.create('Ext.form.Panel');
            form.submit({url: '../' + item.accion + '/tarjetaPruebaPaciente/' + seleccion[0].get('idTarjeta') + '/reporteTarjetaPrueba', standardSubmit: true});
        } else {
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'Debe seleccionar una tarjeta de prueba',
                buttons: Ext.Msg.OK
            });
        }
    }
});