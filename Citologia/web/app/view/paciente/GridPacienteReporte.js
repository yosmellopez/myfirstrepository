Ext.define('Citologia.view.paciente.GridPacienteReporte', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Pacientes',
    alias: 'widget.gridPacienteReporte',
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
                    text: 'Exportar a PDF',
                    scale: 'medium',
                    iconCls: 'fa fa-file-pdf-o fa-1x',
                    accion: 'pdf',
                    scope: this,
                    handler: this.exportar
                }, {
                    xtype: 'button',
                    text: 'Exportar a Word',
                    scale: 'medium',
                    iconCls: 'fa fa-file-word-o fa-1x',
                    accion: 'docx',
                    scope: this,
                    handler: this.exportar
                }, {
                    xtype: 'button',
                    text: 'Exportar a Excel',
                    scale: 'medium',
                    iconCls: 'fa fa-file-excel-o fa-1x',
                    accion: 'xlsx',
                    scope: this,
                    handler: this.exportar
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
function exportar(bot) {
    window.open('/Citologia/' + bot.accion + '/paciente/paciente', '_new');
}