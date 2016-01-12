Ext.define('Citologia.view.areaSalud.GridAreaSalud', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'AreasSalud',
    alias: 'widget.gridAreaSalud',
    title: 'Lista de Areas de Salud',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Area de Salud',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Area de Salud',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Areas de Salud',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'AreasSalud',
            beforePageText: 'P\u00e1gina',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true,
            pageSize: 22,
            refreshText: 'Actualizar',
            width: '100%'
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Nombre Area de Salud',
                dataIndex: 'nombre',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando areas de salud...',
            store: this.getStore()
        });
    }
});