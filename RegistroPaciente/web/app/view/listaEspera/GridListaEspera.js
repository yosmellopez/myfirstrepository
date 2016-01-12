Ext.define('Registro.view.listaEspera.GridListaEspera', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de listas de esperas', //Definimos un título
    itemId: 'gridListaEspera', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridListaEspera', //¡El xtype del que escribía antes!
    store: 'ListaEsperas', //Usa el store de listaEsperas
    forceFit: true,
    selType: 'checkboxmodel',
    height: 500,
    initComponent: function () {
        this.columns = [{
                header: 'Lista Espera',
                dataIndex: 'nombreLista',
                flex: 1
            }, {
                header: 'Prioridad',
                dataIndex: 'prioridad',
                flex: 1
            }];
        this.dockedItems = [{
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
                store: 'ListaEsperas',
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