Ext.define('Registro.view.areaSalud.GridAreaSalud', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'AreasSalud',
    alias: 'widget.gridAreaSalud',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nueva Area Salud',
            scale: 'medium',
            action: 'nuevo'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'AreasSalud',
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
                header: 'Nombre de Area de Salud',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Direcci\u00f3n',
                dataIndex: 'direccion',
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