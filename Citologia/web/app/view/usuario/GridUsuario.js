Ext.define('Citologia.view.usuario.GridUsuario', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Usuarios',
    alias: 'widget.gridUsuario',
    header: {
        xtype: 'header',
        title: 'Lista de Usuarios',
        height: 40,
        iconCls: 'listarUsuarios'
    },
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Usuario',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-user-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Usuario',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Usuarios',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
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
                flex: 1.3
            }, {
                header: 'Usuario',
                dataIndex: 'usuario',
                flex: 1.3
            }, {
                header: 'Rol',
                dataIndex: 'rol',
                flex: 1,
                renderer: function (obj) {
                    return obj.rol;
                }
            }];
        this.callParent(arguments);
    }
});