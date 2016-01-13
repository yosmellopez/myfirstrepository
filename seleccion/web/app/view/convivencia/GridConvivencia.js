Ext.define('Seleccion.view.convivencia.GridConvivencia', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Convivencias',
    alias: 'widget.gridConvivencia',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Convivencia',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus-circle fa-2x'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Convivencias',
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
                header: 'Nombre y Apellidos',
                dataIndex: 'nombreApellidos',
                flex: 1
            }, {
                header: 'Edad',
                dataIndex: 'edad',
                flex: 0.4
            }, {
                header: 'Parentesco',
                dataIndex: 'parentesco',
                flex: 1
            }, {
                header: 'Centro de Trabajo o Escuela',
                dataIndex: 'centroTrabajoEscuela',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Convivencia...',
            store: this.getStore()
        });
    }
});

