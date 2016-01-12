Ext.define('Registro.view.especialidad.GridEspecialidad', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de especialidad', //Definimos un título
    itemId: 'gridEspecialidad', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridEspecialidad', //¡El xtype del que escribía antes!
    store: 'Especialidades', //Usa el store de especialidades
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Nombre de Especialidad',
                dataIndex: 'especialidad',
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
                store: 'Especialidades',
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