Ext.define('Seleccion.view.cronogramaCurso.InsertarCronogramaCurso', {
    extend: 'Ext.window.Window',
    title: 'Insertar Cronograma de Curso',
    alias: 'widget.insertarCronogramaCurso',
    modal: true,
    width: 430,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 140,
                    width: 405
                },
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
                        valueField: 'objeto',
                        allowBlank: false,
                        queryMode: 'local',
                        forceSelection: true,
                        emptyText: 'Seleccione el tipo de curso'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaInicio',
                        editable: false,
                        fieldLabel: 'Fecha de Inicio',
                        emptyText: 'Seleccione la fecha de inicio',
                        vtype: 'rangoFecha',
                        maxValue: new Date(),
                        fechaFinal: 'fechaFinal',
                        itemId: 'fechaInicio'
                    }, {
                        xtype: 'datefield',
                        name: 'fechaFin',
                        vtype: 'rangoFecha',
                        fechaInicio: 'fechaInicio',
                        maxValue: new Date(),
                        itemId: 'fechaFinal',
                        editable: false,
                        fieldLabel: 'Fecha Fin',
                        emptyText: 'Seleccione la fecha fin'
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'insertar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});

