Ext.define('Registro.view.grupo.GridGrupo', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de grupos', //Definimos un título
    itemId: 'gridGrupo', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridGrupo', //¡El xtype del que escribía antes!
    store: 'Grupos', //Usa el store de grupos
    forceFit: true,
    selType: 'checkboxmodel',
    height: 500,
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Nombre del Grupo',
                dataIndex: 'grupo',
                flex: 1
            }];
        this.dockedItems = [//Elementos acoplados al propio control
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: 'Añadir',
                        iconCls: 'add',
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
                store: 'Grupos',
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