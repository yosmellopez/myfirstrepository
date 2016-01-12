Ext.define('Citologia.view.ingreso.GridIngreso', {
    extend: 'Ext.grid.Panel',
    title: 'Listado de ingreso',
    alias: 'widget.aliasgridingresos',
    store: 'Ingresos',
    id: 'ing',
    forceFit: true,
    selType: 'checkboxmodel',
    height: 550,
    features: [{
            ftype: 'grouping',
            groupHeaderTpl: 'Paciente Ingresado: {name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
    enableLocking: false,
    viewConfig: {
        stripeRows: true
    },
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                    '<div style="padding-left:50px;">',
                    '<p><b>Diagnóstico Probable: </b>{diagnosticoProbable}</p></div>')
        }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    text: 'Eliminar',
                    scale: 'medium',
                    action: 'delete',
                    iconCls: 'fa fa-trash-o fa-1x'
                }]
        }, {
            xtype: 'busquedasingresos'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Ingresos',
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            emptyMsg: 'No hay datos que mostrar',
            dock: 'bottom',
            displayInfo: true,
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Paciente',
                dataIndex: 'paciente',
                renderer: function (obj) {
                    return obj.nombre + " " + obj.primerApellido;
                },
                width: 110
            }, {
                header: 'Sala',
                dataIndex: 'cama',
                width: 90,
                renderer: function (obj) {
                    return obj.sala.nombreSala;
                }
            }, {
                header: 'Cama',
                dataIndex: 'cama',
                renderer: function (obj) {
                    return obj.numeroCama;
                },
                width: 35
            }, {
                xtype: 'templatecolumn',
                header: 'Fecha Ingreso',
                width: 75,
                tpl: Ext.create('Ext.XTemplate', '{fecha}<tpl if="meridiano!==true"> PM<tpl else> AM</tpl>')

            }];
        this.callParent(arguments);
    }
});