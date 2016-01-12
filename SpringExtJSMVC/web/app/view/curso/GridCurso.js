Ext.define('CRUD.view.curso.GridCurso', {
    extend: 'Ext.grid.Panel',
    height: 550,
    store: 'Cursos',
    alias: 'widget.gridcurso',
    selType: 'checkboxmodel',
    forceFit: true,
    split: true,
    tbar: [{
            xtype: 'button',
            text: 'Nuevo Curso',
            scale: 'medium',
            action: 'nuevo',
            iconCls: 'fa fa-plus-circle fa-2x blue'
        }, {
            xtype: 'button',
            text: 'Eliminar Curso',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'fa fa-trash fa-2x blue'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'Cursos',
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
                dataIndex: 'nombre',
                flex: 1
            }, {
                header: 'Cantidad Horas',
                dataIndex: 'horas',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando cursos...',
            store: this.getStore()
        });
    }
});