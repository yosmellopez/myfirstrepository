Ext.define('Registro.view.tipoOperacion.GridTipoOperacion', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Tipos de operaciones', //Definimos un título
    itemId: 'gridTipoOperacion', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridTipoOperacion', //¡El xtype del que escribía antes!
    store: 'TiposOperaciones', //Usa el store de operaciones
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'TiposOperaciones',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            emptyMsg: 'No hay datos que mostrar',
            dock: 'bottom',
            displayInfo: true
        }],
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Tipo de Operaci\u00f3n',
                dataIndex: 'tipo',
                flex: 1
            }];
        this.dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        xtype: 'button',
                        text: 'Añadir',
                        iconCls: 'add',
                        action: 'nuevo'
                    }, {
                        text: 'Borrar',
                        iconCls: 'delete',
                        action: 'eliminar'
                    }]
            }, {
                xtype: 'busquedaOperacion'
            }];

        this.callParent(arguments);
    }
});