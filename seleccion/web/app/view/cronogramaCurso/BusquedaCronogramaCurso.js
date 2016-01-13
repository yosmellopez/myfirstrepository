Ext.define('Seleccion.view.cronogramaCurso.BusquedaCronogramaCurso', {
    extend: 'Ext.form.Panel',
    title: 'Buscar Aspirantes',
    alias: 'widget.busquedaCronogramaCurso',
    id: 'busquedaCronogramaCurso',
    collapsible: true,
    iconCls: 'fa fa-search',
    bodyPadding: 5,
    minWidth: '100%',
    collapsed: true,
    frame: true,
    titleCollapse: true,
    defaults: {
        labelAlign: 'top',
        margin: '0 5 0 0',
        flex: 1
    },
    initComponent: function () {
        this.items = [{
                xtype: 'fieldset',
                title: 'Busqueda de Cronograma de Cursos',
                layout: {type: 'hbox', defaultMargins: {right: 10}, align: 'stretchmax', stretchMaxPartner: 'busquedaAspirante'},
                items: [{
                        xtype: 'textfield',
                        name: 'lugar',
                        fieldLabel: 'Lugar',
                        emptyText: 'Inserte el lugar del curso'
                    }, {
                        xtype: 'numberfield',
                        name: 'capacidad',
                        minValue: 1,
                        fieldLabel: 'Capacidad',
                        emptyText: 'Inserte la capacidad del curso'
                    }, {
                        xtype: 'combo',
                        store: 'TiposCursos',
                        name: 'tipoCurso',
                        fieldLabel: 'Tipo de Curso',
                        displayField: 'tipoCurso',
                        valueField: 'idTipoCurso',
                        queryMode: 'local',
                        forceSelection: true,
                        emptyText: 'Seleccione el tipo de curso'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaInicio',
                        fieldLabel: 'Fecha de Inicio',
                        emptyText: 'Seleccione la fecha de inicio',
                        vtype: 'rangoFecha',
                        fechaFinal: 'fechaFinal',
                        itemId: 'fechaInicio'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaFin',
                        vtype: 'rangoFecha',
                        fechaInicio: 'fechaInicio',
                        maxValue: new Date(),
                        itemId: 'fechaFinal',
                        fieldLabel: 'Fecha Fin',
                        emptyText: 'Seleccione la fecha fin'
                    }]
            }];
        this.buttons = [{
                text: 'Buscar',
                scale: 'medium',
                iconCls: 'buscar',
                action: 'buscar'
            }, {
                scope: this,
                text: 'Limpiar',
                scale: 'medium',
                iconCls: 'limpiar',
                handler: function (bot) {
                    bot.up('form').getForm().reset();
                }
            }];
        this.callParent(arguments);
    },
    listeners: {
        collapse: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
        }
    }
});