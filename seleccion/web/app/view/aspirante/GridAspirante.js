Ext.define('Seleccion.view.aspirante.GridAspirante', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Aspirantes',
    alias: 'widget.gridAspirante',
    selType: 'checkboxmodel',
    forceFit: true,
    dockedItems: [{
            xtype: 'toolbar',
            items: [{
                    xtype: 'button',
                    text: 'Nuevo Aspirante',
                    scale: 'medium',
                    action: 'nuevo',
                    iconCls: 'fa fa-plus-circle fa-2x'
                }, {
                    xtype: 'button',
                    text: 'Eliminar',
                    scale: 'medium',
                    action: 'eliminar',
                    iconCls: 'x-fa fa-trash'
                }]
        }, {
            xtype: 'busquedaAspirante'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Aspirantes',
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
                header: 'Nombre',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Apellidos',
                dataIndex: 'apellidos',
                flex: 1
            }, {
                header: 'Carne Identidad',
                dataIndex: 'ci',
                flex: 1
            }, {
                header: 'Edad',
                dataIndex: 'edad',
                flex: 1
            }, {
                xtype: 'booleancolumn',
                header: 'Sexo (F/M)',
                dataIndex: 'sexo',
                flex: 1,
                trueText: 'Masculino',
                falseText: 'Femenino'
            }, {
                header: 'Direccion',
                dataIndex: 'direccion',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Aspirante...',
            store: this.getStore()
        });
    }
});


