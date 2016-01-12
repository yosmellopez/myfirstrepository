Ext.define('Citologia.view.consultorio.GridConsultorio', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Consultorios',
    alias: 'widget.gridConsultorio',
    title: 'Lista de Consultorios',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Consultorio',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Consultorio',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Consultorios',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Consultorios',
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
                header: 'Nombre Consultorio',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Area de Salud',
                dataIndex: 'areaSalud',
                flex: 1,
                renderer: function (obj) {
                    return obj.nombre;
                }
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando consultorios...',
            store: this.getStore()
        });
    }
});