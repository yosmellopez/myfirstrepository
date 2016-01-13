Ext.define('Seleccion.view.datosAspirante.GridDatosAspirante', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'DatosAspirantes',
    alias: 'widget.gridDatosAspirante',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Datos Aspirante',
            scale: 'medium',
            action: 'nuevo'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'DatosAspirantes',
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
                header: 'No',
                xtype: 'rownumberer'
            }, {
                header: 'Antecedente Patologico',
                dataIndex: 'antecedentePatologico',
                flex: 1
            }, {
                header: 'Antecedente Familiar',
                dataIndex: 'antecedenteFamiliar',
                flex: 1
            }, {
                header: 'Antecedente Penal',
                dataIndex: 'antecedentePenal',
                flex: 1
            }, {
                header: 'Numero de Hijos',
                dataIndex: 'numHijos',
                flex: 1
            }, {
                header: 'Problemas Familiares',
                dataIndex: 'problemaFamiliar',
                flex: 1
            }, {
                header: 'Personas de Convivencia',
                dataIndex: 'personasConvivencia',
                flex: 1
            }
        ];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Datos del Aspirante',
            store: this.getStore()
        });
    }
});

