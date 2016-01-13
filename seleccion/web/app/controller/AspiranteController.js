Ext.define('Seleccion.controller.AspiranteController', {
    extend: 'Ext.app.Controller',
    views: ['aspirante.GridAspirante', 'aspirante.InsertarAspirante', 'aspirante.ModificarAspirante', 'aspirante.BusquedaAspirante'],
    stores: ['Aspirantes', 'NivelesEscolares'],
    models: ['Aspirante', 'NivelEscolar'],
    refs: [{
            ref: 'grid',
            selector: 'gridAspirante'
        }],
    datosVacios: false,
    init: function () {
        this.control({
            'gridAspirante button[action=nuevo]': {
                click: this.nuevo
            },
            'insertarAspirante button[action=insertar]': {
                click: this.insertar
            },
            'insertarAspirante button[action=finalizar]': {
                click: this.insertar
            },
            'insertarAspirante textfield[action=escribir]': {
                keyup: this.validarBoton
            },
            'insertarAspirante button[action=atras],modificarAspirante button[action=atras]': {
                click: this.atras
            },
            'busquedaAspirante button[action=buscar]': {
                click: this.buscar
            },
            'gridAspirante': {
                itemdblclick: this.editar,
                cellkeydown: this.eliminarTecla
            },
            'modificarAspirante button[action=insertar]': {
                click: this.modificar
            },
            'modificarAspirante button[action=finalizar]': {
                click: this.modificar
            },
            'gridAspirante button[action=eliminar]': {
                click: this.eliminar
            }
        });
    },
    validarBoton: function (text) {
        win = text.up('window');
        container = text.up('fieldset');
        elems = container.query('[action=escribir]');
        valido = true;
        for (i = 0; i < elems.length; i++) {
            if (!elems[i].isValid())
                valido = false;
        }
        vm = win.getViewModel();
        vm.setData({accion: 'insertar', iconoFinalizar: 'icon-arrow-right', botonValido: valido});
    },
    nuevo: function (button) {
        win = Ext.widget('insertarAspirante');
        win.show(button);
    },
    insertar: function (buton) {
        var me = this;
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getAspirantesStore();
            v = basicForm.getValues();
            aspirante = {nombre: v.nombre, apellidos: v.apellidos, ci: v.ci, edad: v.edad, direccion: v.direccion, sexo: v.sexo === true};
            aspirante.datosAspirante = {antecedenteFamiliar: v.antecedenteFamiliar, antecedentePatologico: v.antecedentePatologico, antecedentePenal: v.antecedentePenal, numHijos: v.numHijos, problemaFamiliar: v.problemaFamiliar, personasConvivencia: v.personasConvivencia};
            record = Ext.create('Seleccion.model.Aspirante', aspirante);
            store.add(record);
            win.setLoading('Insertando aspirante...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Aspirantes insertada exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                    stDA = me.getController('DatosAspiranteController').getDatosAspirantesStore();
                    stDA.add(record.get('datosAspirante'));
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
        win = Ext.widget('modificarAspirante').show(grid);
        form = win.down('form');
        form.loadRecord(record);
        containerI = form.queryById('containerI');
        if (record.get('datosAspirante')) {
            containerI.cargarDatos(record.get('datosAspirante'));
            console.log(record.get('datosAspirante'));
            this.datosVacios = false;
        } else {
            this.datosVacios = true;
        }
    },
    modificar: function (buton) {
        var me = this;
        console.log(me);
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getAspirantesStore();
            v = basicForm.getValues();
            record = form.getRecord();
            v.datosAspirante = {antecedenteFamiliar: v.antecedenteFamiliar, antecedentePatologico: v.antecedentePatologico, antecedentePenal: v.antecedentePenal, numHijos: v.numHijos, problemaFamiliar: v.problemaFamiliar, personasConvivencia: v.personasConvivencia};
            if (!this.datosVacios) {
                v.datosAspirante.idDatosAspirante = v.idDatosAspirante;
            }
            record.set(v);
            if (record.dirty)
                win.setLoading('Insertando aspirante...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Aspirante modificado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                    stDA = me.getController('DatosAspiranteController').getDatosAspirantesStore();
                    if (me.datosVacios) {
                        stDA.add(record.get('datosAspirante'));
                        stDA.sync();
                    }
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
    eliminar: function () {
        grid = this.getGrid();
        records = grid.getSelectionModel().getSelection();
        if (records.length !== 0) {
            store = this.getAspirantesStore();
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
                        grid.setLoading('Eliminando aspirante' + (n === 1 ? '' : 'es') + '...');
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
