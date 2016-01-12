Ext.define('CRUD.view.usuario.BuscarUsuario', {
    extend: 'Ext.form.Panel',
    title: 'Buscar Doctores',
    alias: 'widget.buscarUsuario',
    collapsible: true,
    bodyPadding: 5,
    collapsed: true,
    titleCollapse: true,
    layout: {type: 'hbox', defaultMargins: {right: 10}},
    defaults: {
        labelWidth: 50,
        layout: {type: 'anchor'}
    },
    initComponent: function () {
        this.items = [{
                xtype: 'container',
                flex: 1,
                defaults: {
                    anchor: '100%'
                },
                items: [{
                        xtype: 'textfield',
                        name: 'likeLnombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte el nombre'
                    }, {
                        xtype: 'textfield',
                        name: 'apellidos',
                        fieldLabel: 'Apellidos',
                        emptyText: 'Inserte Apellidos'
                    }, {
                        xtype: 'textfield',
                        name: 'usuario',
                        fieldLabel: 'Usuario',
                        emptyText: 'Inserte nombre de usuario'
                    }]
            }, {
                xtype: 'container',
                flex: 1,
                defaults: {
                    anchor: '100%'
                },
                items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Contraseña',
                        name: 'contrasena',
                        inputType: 'password',
                        itemId: 'pass'
                    }, {
                        xtype: 'datefield',
                        name: 'rangoIfechaAcceso',
                        fieldLabel: 'Fecha Acceso',
                        emptyText: 'Seleccione Fecha Acceso'
                    }, {
                        xtype: 'datefield',
                        name: 'rangoFfechaAcceso',
                        fieldLabel: 'Fecha Acceso',
                        emptyText: 'Seleccione Fecha Acceso'
                    }, {
                        xtype: 'combo',
                        store: 'Sedes',
                        name: 'departamento.facultad.sede.idSede',
                        fieldLabel: 'Sede',
                        displayField: 'nombre',
                        valueField: 'idSede',
                        queryMode: 'local',
                        emptyText: 'Seleccione Sede'
                    }]
            }, {
                xtype: 'container',
                flex: 1,
                defaults: {
                    anchor: '100%'
                },
                items: [{
                        xtype: 'combo',
                        store: 'Facultades',
                        name: 'departamento.facultad.idFacultad',
                        fieldLabel: 'Facultad',
                        displayField: 'nombre',
                        valueField: 'idFacultad',
                        queryMode: 'local',
                        emptyText: 'Seleccione Facultad'
                    }, {
                        xtype: 'combo',
                        store: 'Roles',
                        name: 'departamento.idDepartamento',
                        fieldLabel: 'Departamento',
                        displayField: 'nombre',
                        valueField: 'idDepartamento',
                        queryMode: 'local',
                        emptyText: 'Seleccione Departamento'
                    }, {
                        xtype: 'combo',
                        store: 'Roles',
                        name: 'multipleMrol.idRol',
                        fieldLabel: 'Rol',
                        displayField: 'rol',
                        valueField: 'idRol',
                        queryMode: 'local',
                        emptyText: 'Seleccione Rol',
                        multiSelect: true
                    }, {
                        xtype: 'combo',
                        store: 'Cursos',
                        name: 'joinJcursos.idCurso',
                        fieldLabel: 'Cursos',
                        displayField: 'nombre',
                        valueField: 'idCurso',
                        queryMode: 'local',
                        emptyText: 'Seleccione Curso'
                    }]
            }, ];
        this.buttons = [{
                text: 'Buscar',
                scale: 'medium',
                action: 'buscar'
            }, {
                text: 'Limpiar',
                scope: this,
                scale: 'medium',
                handler: function (bot) {
                    bot.up('form').getForm().reset();
                }
            }];
        this.callParent(arguments);
    },
    listeners: {
        collapse: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
        }
    }
});