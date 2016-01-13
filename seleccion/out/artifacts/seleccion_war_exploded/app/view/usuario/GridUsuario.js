Ext.define('Seleccion.view.usuario.GridUsuario', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Usuarios',
    header: {
        title: '<span class="x-fa fa-user">  Lista de Usuarios</span>'
    },
    alias: 'widget.gridusuario',
    selType: 'checkboxmodel',
    forceFit: true,
    split: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Usuario',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'x-fa fa-user-plus'
        }, {
            xtype: 'button',
            text: 'Eliminar Usuario',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
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
                header: 'Usuario',
                dataIndex: 'usuario',
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