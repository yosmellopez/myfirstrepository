Ext.define('CRUD.view.rol.GridRol', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Roles',
    header: {
        title: '<span class="x-fa fa-user">  Lista de Roles</span>'
    },
    alias: 'widget.gridrol',
    selType: 'checkboxmodel',
    forceFit: true,
    split: true,
    tbar: [{
        xtype: 'button',
        text: 'Nuevo Rol',
        scale: 'medium',
        action: 'nuevo',
        iconCls: 'fa fa-plus-circle fa-2x blue'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'Roles',
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
            dataIndex: 'rol',
            flex: 1
        }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando roles...',
            store: this.getStore()
        });
    }
});