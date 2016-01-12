Ext.define('Registro.view.tarjetaEstiba.GridTarjetaEstiba', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de operaciones de los recursos', //Definimos un título
    itemId: 'gridTarjetaEstiba', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridTarjetaEstiba', //¡El xtype del que escribía antes!
    store: 'TarjetaEstibas', //Usa el store de tarjetaEstibas
    forceFit: true,
    height: 600,
    features: [{
            ftype: 'groupingsummary',
            groupHeaderTpl: 'Nombre Del Recurso: {name}'
        }],
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Nombre',
                dataIndex: 'recurso',
                flex: 1,
                renderer: function (obj) {
                    return obj.nombre;
                },
                summaryRenderer: function () {
                    return 'Cantidad Restante:';
                }
            }, {
                header: 'Cantidad',
                dataIndex: 'cantidad',
                flex: 2,
                summaryType: 'sum'
            }, {
                header: 'Fecha Operacion',
                dataIndex: 'fecha',
                flex: 2
            }, {
                xtype: 'booleancolumn',
                header: 'Tipo de Operacion',
                dataIndex: 'operacion',
                trueText: 'Entrada',
                falseText: 'Salida',
                flex: 2
            }];
        this.dockedItems = [//Elementos acoplados al propio control
            {
                xtype: 'pagingtoolbar',
                store: 'TarjetaEstibas',
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