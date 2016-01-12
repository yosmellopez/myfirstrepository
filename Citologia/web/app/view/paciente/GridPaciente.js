Ext.define('Citologia.view.paciente.GridPaciente', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Pacientes',
    alias: 'widget.gridPaciente',
    title: 'Lista de Pacientes',
    selType: 'checkboxmodel',
    forceFit: true,
    id: 'gridPaciente',
    enableLocking: true,
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate('<fieldset><legend> Datos adicionales del Paciente</legend><p><b>Consulta:</b> {consulta}</p><p><b>Ocupaci\u00f3n:</b> {ocupacion}</p>',
                    '<p><b>Direcci\u00f3n:</b> {direccion}</p>',
                    '<p><b>Area de Salud:</b> {consultorio.areaSalud.nombre}</p>',
                    '</fieldset>')
        }],
    dockedItems: [{
            xtype: 'toolbar',
            items: [{
                    xtype: 'button',
                    text: 'Nuevo Paciente',
                    scale: 'medium',
                    action: 'nuevo',
                    iconCls: 'fa fa-plus fa-1x'
                }, {
                    xtype: 'button',
                    text: 'Modificar Paciente',
                    scale: 'medium',
                    action: 'editar',
                    iconCls: 'ion-edit fa-1-4x'
                }, {
                    xtype: 'button',
                    text: 'Eliminar Pacientes',
                    scale: 'medium',
                    action: 'eliminar',
                    iconCls: 'fa fa-trash-o fa-1x'
                }]
        }, {
            xtype: 'busquedaPaciente'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Pacientes',
            beforePageText: 'P\u00e1gina',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true,
            pageSize: 22,
            refreshText: 'Actualizando',
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 1
            }, {
                xtype: 'templatecolumn',
                header: 'Apellidos',
                tpl: '{primerApellido} {segundoApellido}',
                flex: 1.3
            }, {
                header: 'No. Identidad',
                dataIndex: 'ci',
                flex: 1
            }, {
                header: 'Historia Cl\u00ednica',
                dataIndex: 'historiaClinica',
                flex: 1
            }, {
                xtype: 'booleancolumn',
                header: 'Detenci\u00f3n Precoz',
                dataIndex: 'detencionPrecoz',
                trueText: 'Si',
                falseText: 'No',
                flex: 1
            }, {
                header: 'Edad',
                dataIndex: 'edad',
                flex: 0.5
            }, {
                header: 'Consultorio',
                dataIndex: 'consultorio',
                flex: 1.3,
                renderer: function (obj) {
                    return obj.nombre;
                }
            }];
        this.callParent(arguments);
    }
});