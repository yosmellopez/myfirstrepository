Ext.define('Seleccion.view.nivelEscolar.GridNivelEscolar', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'NivelesEscolares',
    alias: 'widget.gridNivelEscolar',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Nivel Escolar',
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
            store: 'NivelesEscolares',
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
                header: 'Nivel Escolar',
                dataIndex: 'nivelEscolar',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Niveles Escolares...',
            store: this.getStore()
        });
    }
});
