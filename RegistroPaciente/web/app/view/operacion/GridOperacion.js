Ext.define('Registro.view.operacion.GridOperacion', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de operaciones', //Definimos un título
    itemId: 'gridOperacion', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridOperacion', //¡El xtype del que escribía antes!
    store: 'Operaciones', //Usa el store de operaciones
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    bbar:[{
            xtype: 'pagingtoolbar',
            store: 'Operaciones',
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
            header: 'Paciente',
            columns: [{
                header: 'Nombre',
                dataIndex: 'paciente',
                width: 150,
                renderer: function (obj) {
                    return obj.nombre;
                }
            }, {
                header: 'Apelidos',
                dataIndex: 'paciente',
                width: 150,
                renderer: function (obj) {
                    return obj.apellidos;
                }
            },{
                header: 'Historia Clinica',
                dataIndex: 'paciente',
                width: 120,
                renderer: function (obj) {
                    return obj.historiaClinica;
                }
            }, {
                header: 'Numero Identidad',
                dataIndex: 'paciente',
                width: 120,
                renderer: function (obj) {
                    return obj.ci;
                }
            }]
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
            flex: 2,
            renderer: function (obj) {
                return obj.especialidad;
            }
        }, {
            header: 'Fecha de Operaci\u00f3n',
            dataIndex: 'fechaOperacion',
            flex: 2
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Añadir',
                iconCls: 'add',
                action: 'nuevo'
            },{
                text: 'Borrar',
                iconCls: 'delete',
                action: 'eliminar'
            }]
        }, {
            xtype:'busquedaOperacion'
        }];

        this.callParent(arguments);
    }
});