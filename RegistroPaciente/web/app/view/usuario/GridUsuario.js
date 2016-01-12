Ext.define('Registro.view.usuario.GridUsuario', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de usuarios', //Definimos un título
    itemId: 'gridUsuario', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridUsuario', //¡El xtype del que escribía antes!
    store: 'Usuarios', //Usa el store de usuarios
    forceFit: true,
    selType: 'checkboxmodel',
    minHeight: 500,
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Usuario',
                dataIndex: 'usuario',
                flex: 1
            }, {
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 2
            }, {
                header: 'Apellidos',
                dataIndex: 'apellidos',
                flex: 2
            }, {
                header: 'Rol',
                dataIndex: 'rol',
                flex: 1,
                renderer: function (val) {
                    return val.rol;
                }
            }];
        this.dockedItems = [//Elementos acoplados al propio control
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: 'Añadir',
                        scale: 'medium',
                        iconCls: 'icofont-plus-sign',
                        action: 'nuevo'
                    },
                    {
                        text: 'Borrar',
                        iconCls: 'delete',
                        action: 'eliminar'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: 'Usuarios',
                beforePageText: 'Página',
                afterPageText: 'de {0}',
                displayMsg: 'Mostrando {0} - {1} de {2}',
                emptyMsg: 'No hay datos que mostrar',
                dock: 'bottom',
                displayInfo: true
            }];

        this.callParent(arguments);
    }
});