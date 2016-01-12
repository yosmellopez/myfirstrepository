Ext.define('Registro.view.paciente.GridPaciente', {
    extend: 'Ext.grid.Panel', //Extiende al componente Panel
    title: 'Listado de pacientes', //Definimos un título
    itemId: 'gridPaciente', //Un identificador (para tratar con el mismo desde el controlador) 
    xtype: 'gridPaciente', //¡El xtype del que escribía antes!
    store: 'Pacientes', //Usa el store de pacientes
    forceFit: true,
    height: 500,
    selType: 'checkboxmodel',
    enableLocking: true,
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate('<tpl for="."><p><b>Direccion Particular:</b> {direccionParticular}</p>',
                    '<p><b>Diagnostico:</b> {diagnostico}</p>', '<p><b>Patologia Tumoral:</b> {patologiaTumoral}</p>',
                    '<p><b>Observaciones:</b> {observaciones}</p>', '<p><b>Grupo Factor:</b> {grupoFactor}</p>'
                    , '</tpl>')
        }],
    initComponent: function () {
        this.columns = [{
                header: 'Historia Clínica',
                dataIndex: 'historiaClinica',
                flex: 1
            }, {
                header: 'CI',
                dataIndex: 'ci',
                flex: 1
            }, {
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 2
            }, {
                header: 'Apellidos',
                dataIndex: 'apellidos',
                flex: 2
            }, {
                header: 'Teléfono',
                dataIndex: 'telefono',
                flex: 1.5
            }, {
                header: 'Fecha Entrada',
                dataIndex: 'fechaEntrada',
                flex: 1.8
            }, {
                header: 'Fecha Probable a Operar',
                dataIndex: 'fechaProbableOperacion',
                flex: 2
            }, {
//                header: 'Fecha Registro Baja',
//                dataIndex: 'fechaRegistroBaja',
//                flex: 2
//            }, {
                header: 'Área de Salud',
                dataIndex: 'areaSalud',
                flex: 2,
                renderer: function (o) {
                    return o.nombre;
                }
            }, {
                header: 'Especialidad',
                dataIndex: 'especialidad',
                flex: 2,
                renderer: function (o) {
                    return o.especialidad;
                }
            }, {
                header: 'Lista de espera',
                dataIndex: 'listaEspera',
                flex: 2,
                renderer: function (o) {
                    return o.nombreLista;
                }
            }, {
                header: 'Causa de la Baja',
                dataIndex: 'causaBaja',
                flex: 2,
                renderer: function (o) {
                    return o.causa;
                }
            }];
        this.dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                defaults: {
                    scale: 'medium'
                },
                items: [{
                        xtype: 'button',
                        text: 'Añadir',
                        iconCls: 'add',
                        action: 'nuevo'
                    }, {
                        text: 'Borrar',
                        iconCls: 'delete',
                        action: 'eliminar'
                    }, {
                        text: 'Nueva Operacion',
                        iconCls: 'nuevaOperacion',
                        action: 'nuevaOperacion'
                    }]
            }, {
                xtype: 'pagingtoolbar',
                store: 'Pacientes',
                beforePageText: 'Página',
                afterPageText: 'de {0}',
                displayMsg: 'Mostrando {0} - {1} de {2}',
                emptyMsg: 'No hay datos que mostrar',
                dock: 'bottom',
                displayInfo: true
            }, {
                xtype: 'busquedaPaciente'
            }];
        this.callParent(arguments);
    }
});