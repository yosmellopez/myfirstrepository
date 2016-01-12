Ext.define('Citologia.view.responsable.GridResponsableMuestra', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'ResponsablesMuestra',
    alias: 'widget.gridResponsableMuestra',
    title: 'Lista de Responsables Muestras',
    selType: 'checkboxmodel',
    iconCls: 'lista',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Responsable Muestra',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus fa-1x'
        }, {
            xtype: 'button',
            text: 'Modificar Responsable Muestra',
            scale: 'medium',
            action: 'editar',
            iconCls: 'ion-edit fa-1-4x'
        }, {
            xtype: 'button',
            text: 'Eliminar Responsable Muestras',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash-o fa-1x'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'ResponsablesMuestra',
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
                header: 'Nombre de Responsable Muestra',
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Apellidos',
                dataIndex: 'apellidos',
                flex: 1
            }];
        this.callParent(arguments);
    }
});