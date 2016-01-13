Ext.define('Seleccion.view.cronogramaCurso.GridCronogramaCurso', {
    extend: 'Ext.grid.Panel',
    height: 500,
    store: 'CronogramasCursos',
    alias: 'widget.gridCronogramaCurso',
    selType: 'checkboxmodel',
    forceFit: true,
    dockedItems: [{
            xtype: 'toolbar',
            items: [{
                    xtype: 'button',
                    text: 'Insertar Cronograma Curso',
                    scale: 'medium',
                    action: 'nuevo',
                    iconCls: 'fa fa-plus-circle fa-2x'
                }, {
                    xtype: 'button',
                    text: 'Eliminar',
                    scale: 'medium',
                    action: 'eliminar',
                    iconCls: 'x-fa fa-trash'
                }, {
                    xtype: 'button',
                    text: 'Añadir Aspirante a Curso',
                    scale: 'medium',
                    action: 'insertarAspirante',
                    iconCls: 'x-fa fa-trash'
                }]
        }, {
            xtype: 'busquedaCronogramaCurso'
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
    plugins: [{
            ptype: 'subtable',
            association: 'aspirantes',
            title: 'Aspirantes Matriculados en Curso',
            columns: [{
                    header: 'No',
                    xtype: 'rownumberer'
                }, {
                    header: 'Nombre y Apellidos',
                    dataIndex: 'nombre',
                    flex: 1,
                    xtype: 'templatecolumn',
                    tpl: '{nombre} {apellidos}'
                }, {
                    header: 'Carne Identidad',
                    dataIndex: 'ci',
                    flex: 1,
                    renderer: function (val) {
                        return '<span>' + val + '</span>';
                    }
                }, {
                    header: 'Edad',
                    dataIndex: 'edad',
                    flex: 1
                }, {
                    xtype: 'booleancolumn',
                    header: 'Sexo (F/M)',
                    dataIndex: 'sexo',
                    flex: 1,
                    trueText: 'Masculino',
                    falseText: 'Femenino'
                }, {
                    header: 'Direccion',
                    dataIndex: 'direccion',
                    flex: 1
                }]
        }],
    initComponent: function () {
        this.columns = [{
                header: 'No',
                xtype: 'rownumberer'
            }, {
                header: 'Lugar',
                dataIndex: 'lugar',
                flex: 1
            }, {
                header: 'Capacidad',
                dataIndex: 'capacidad',
                flex: 0.5
            }, {
                header: 'Tipo de Curso',
                dataIndex: 'tipoCurso',
                flex: 1,
                renderer: function (obj) {
                    return obj.tipoCurso;
                }
            }, {
                header: 'Fecha de Inicio',
                dataIndex: 'fechaInicio',
                flex: 0.7
            }, {
                header: 'Fecha de Terminaci\u00f3n',
                dataIndex: 'fechaFin',
                flex: 0.7
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando Cronogramas de Cursos...',
            store: this.getStore()
        });
    }
});

