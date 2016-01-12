Ext.define('Registro.view.especialista.GridEspecialista', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de especialistas', //Definimos un título
    itemId: 'gridEspecialista', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridEspecialista', //¡El xtype del que escribía antes!
    store: 'Especialistas', //Usa el store de especialistas
    forceFit: true,
    selType: 'checkboxmodel',
    height: 500,
    initComponent: function () {
        this.columns = [//Columnas del grid
            {
                header: 'Nombre del Especialista',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Apelldios del Especialista',
                dataIndex: 'apellidos',
                flex: 1
            }, {
                header: 'Grupo',
                dataIndex: 'grupo',
                flex: 1,
                renderer: function (obj) {
                    return obj.grupo;
                }
            }, {
                header: 'Especialidad',
                dataIndex: 'especialidad',
                flex: 1,
                renderer: function (obj) {
                    return obj.especialidad;
                }
            }, {
                xtype: 'booleancolumn',
                header: 'Disponible',
                dataIndex: 'disponible',
                flex: 1,
                trueText: 'Si',
                falseText: "No"
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
                store: 'Especialistas',
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