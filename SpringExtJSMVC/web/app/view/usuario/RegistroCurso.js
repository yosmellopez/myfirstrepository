Ext.define('CRUD.view.usuario.RegistroCurso', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Usuario',
    alias: 'widget.nuevoRegistroCurso',
    width: 610,
    modal: true,
    requires: ['CRUD.plugins.GridSelector'],
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 140,
                    width: 580,
                    msgTarget: 'side'
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte el nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'apellidos',
                        fieldLabel: 'Apellidos',
                        emptyText: 'Inserte Apellidos'
                    }, {
                        xtype: 'numberfield',
                        name: 'ci',
                        fieldLabel: 'No. Identidad',
                        emptyText: 'No. Identidad'
                    }, {
                        xtype: 'gridselectfield',
                        store: 'Cursos',
                        fromTitle: 'Habilitados',
                        allowBlank: true,
                        toTitle: 'Seleccionados',
                        searchField: 'nombre',
                        name: 'cursos',
                        height: 240,
                        flexFrom: 2,
                        flexTo: 2,
                        columns: [{
                                xtype: 'rownumberer'
                            }, {
                                header: 'Nombre',
                                dataIndex: 'nombre',
                                flex: 3
                            }, {
                                header: 'Horas',
                                dataIndex: 'horas',
                                flex: 1
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'insertar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});

