Ext.define('Seleccion.view.cronogramaCurso.InsertarAspirantes', {
    extend: 'Ext.window.Window',
    title: 'Insertar Aspirantes a Cursos',
    alias: 'widget.insertarAspirantes',
    width: 800,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                items: [{
                        xtype: 'fieldset',
                        title: 'Datos del Curso',
                        layout: {
                            type: 'hbox',
                            stretch: 'stretchmax'
                        },
                        defaults: {
                            allowBlank: false,
                            flex: 1
                        },
                        items: [{
                                xtype: 'container',
                                defaults: {
                                    allowBlank: true,
                                    labelWidth: 140,
                                    width: 370,
                                    editable: false,
                                    submitValue: false
                                },
                                margin: '0 10 0 0',
                                items: [{
                                        xtype: 'textfield',
                                        name: 'lugar',
                                        fieldLabel: 'Lugar'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'capacidad',
                                        minValue: 1,
                                        fieldLabel: 'Capacidad'
                                    }]
                            }, {
                                xtype: 'container',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 140,
                                    width: 370,
                                    editable: false,
                                    submitValue: false
                                },
                                items: [{
                                        xtype: 'textfield',
                                        name: 'fechaInicio',
                                        fieldLabel: 'Fecha de Inicio'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'fechaFin',
                                        fieldLabel: 'Fecha Fin'
                                    }]
                            }]
                    }, {
                        xtype: 'gridselectfield',
                        id: 'gridselectfield',
                        store: 'Aspirantes',
                        fromTitle: 'Habilitados',
                        allowBlank: true,
                        toTitle: 'Seleccionados',
                        searchField: 'integracionRevolucionaria',
                        name: 'aspirantes',
                        action: 'verificar',
                        rightGridId: 'seleccionados',
                        rightAction: 'ver',
                        width: 780,
                        height: 330,
                        flexFrom: 10,
                        flexTo: 10,
                        columns: [{
                                header: 'No',
                                xtype: 'rownumberer'
                            }, {
                                header: 'Nombre y Apellidos',
                                dataIndex: 'nombre',
                                flex: 1,
                                xtype: 'templatecolumn',
                                tpl: '{nombre} {apellidos}'
                            }]
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'insertarAspirante'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});