Ext.define('Citologia.view.estadistica.GridPatologiaCuelloGrupoEdad', {
    extend: 'Ext.grid.Panel',
    height: 200,
    title: 'Patolog\u00eda de Cuello Por Grupo de Edades',
    store: 'PatologiasCuelloGrupoEdades',
    alias: 'widget.gridPatologiaCuelloGrupoEdad',
    selType: 'checkboxmodel',
    forceFit: true,
    features: [{
            ftype: 'summary'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Rango de Edad',
                dataIndex: 'rangoEdad',
                flex: 1,
                summaryRenderer: function () {
                    return "Total: ";
                }
            }, {
                header: 'Negativos',
                dataIndex: 'negativo',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'Inflamatorios',
                dataIndex: 'inflamatorio',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'NIC I',
                dataIndex: 'nicI',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'NIC II',
                dataIndex: 'nicII',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'NIC III',
                dataIndex: 'nicIII',
                flex: 1,
                summaryType: 'sum'
            }, {
                header: 'Carsinomas',
                dataIndex: 'carsinoma',
                flex: 1,
                summaryType: 'sum'
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando ...',
            store: this.getStore()
        });
    }
});