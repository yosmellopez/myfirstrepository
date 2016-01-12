Ext.define('CRUD.view.usuario.GridUsuario', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Usuarios',
    requires: ['CRUD.plugins.SubTable'],
    header: {
        title: '<span class="fa fa-user">  Lista de Usuarios</span>'
    },
    id: 'gridUsuario',
    alias: 'widget.gridusuario',
    selType: 'checkboxmodel',
    forceFit: true,
    split: true,
    enableLocking: true,
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            title: 'Cursos',
            items: [{
                    xtype: 'button',
                    text: 'Nuevo Usuario',
                    scale: 'medium',
                    action: 'nuevo',
                    iconCls: 'fa fa-user-plus fa-2x blue'
                }, {
                    xtype: 'button',
                    text: 'Eliminar Usuario',
                    scale: 'medium',
                    action: 'eliminar',
                    iconCls: 'fa fa-trash fa-2x blue'
                }, {
                    xtype: 'button',
                    text: 'Registrar en Cursos',
                    scale: 'medium',
                    action: 'registrar',
                    iconCls: 'fa fa-plus-circle fa-2x blue'
                }]
        }, {
            xtype: 'buscarUsuario'
        }],
    plugins: [{
            ptype: 'subtable',
            association: 'cursos',
            columns: [{
                    xtype: 'rownumberer'
                }, {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    flex: 1
                }, {
                    header: 'Cantidad Horas',
                    dataIndex: 'horas',
                    flex: 1
                }]
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Usuarios',
            beforePageText: 'P\u00e1gina',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true,
            pageSize: 22,
            refreshText: 'Actualizando',
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Apellidos',
                dataIndex: 'apellidos',
                flex: 1
            }, {
                header: 'No. Identidad',
                dataIndex: 'ci',
                flex: 1
            }, {
                header: 'Usuario',
                dataIndex: 'usuario',
                flex: 1
            }, {
                header: 'Fecha Acceso',
                dataIndex: 'fechaAcceso',
                flex: 1
            }, {
                header: 'Rol',
                dataIndex: 'rol',
                flex: 1,
                renderer: function (obj) {
                    return obj.rol;
                }
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando usuarios...',
            store: this.getStore()
        });
    }
});