Ext.define('Seleccion.view.cronogramaCurso.GridCronogramaCurso', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'CronogramasCursos',
    alias: 'widget.gridCronogramaCurso',
    selType: 'checkboxmodel',
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Cronograma Curso',
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
            store: 'CronogramasCursos',
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
                header: 'Nombre de la Madre',
                dataIndex: 'nombreMadre',
                flex: 1
            }, {
                header: 'Nombre del Padre',
                dataIndex: 'nombreMadre',
                flex: 1
            }, {
                header: 'Nivel de Escolaridad',
                dataIndex: 'nombreMadre',
                flex: 1
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Cronogramas de Cursos...',
            store: this.getStore()
        });
    }
});

