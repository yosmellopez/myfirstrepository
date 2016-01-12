Ext.define('Registro.view.recurso.GridRecurso', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de recursos', //Definimos un título
    itemId: 'gridRecurso', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridRecurso', //¡El xtype del que escribía antes!
    store: 'Recursos', //Usa el store de recursos
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    initComponent: function () {
        this.columns = [{
                header: 'Nombre de Recurso',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Cantidad',
                dataIndex: 'cantidadRestante',
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
                store: 'Recursos',
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