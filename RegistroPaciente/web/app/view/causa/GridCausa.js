Ext.define('Registro.view.causa.GridCausa', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de causas', //Definimos un título
    itemId: 'gridCausa', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridCausa', //¡El xtype del que escribía antes!
    store: 'Causas', //Usa el store de causas
    forceFit: true,
    selType: 'checkboxmodel',
    height: 500,
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Nombre de Causa',
                dataIndex: 'causa',
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
                store: 'Causas',
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