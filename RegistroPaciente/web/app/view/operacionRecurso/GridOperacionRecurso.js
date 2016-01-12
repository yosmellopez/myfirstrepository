Ext.define('Registro.view.operacionRecurso.GridOperacionRecurso', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de operacionRecursos', //Definimos un título
    itemId: 'gridOperacionRecurso', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridOperacionRecurso', //¡El xtype del que escribía antes!
    store: 'OperacionRecursos', //Usa el store de operacionRecursos
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Cantidad de Recursos',
                dataIndex: 'cantidad',
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
                store: 'OperacionRecursos',
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