Ext.define('Seleccion.view.solicitud.GridSolicitud', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'Solicitudes',
    alias: 'widget.gridSolicitud',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Solicitud',
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
            store: 'Solicitudes',
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
                header: 'Causa de Solicitud',
                dataIndex: 'causaSolicitud',
                flex: 1
            }, {
                header: 'Fecha de Solicitud',
                dataIndex: 'fechaSolicitud',
                flex: 1
            }, {
                header: 'Aspirante',
                dataIndex: 'aspirante',
                flex: 1,
                renderer: function (obj) {
                    return obj.nombre;
                }
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Solictud...',
            store: this.getStore()
        });
    }
});

