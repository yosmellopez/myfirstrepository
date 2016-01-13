Ext.define('Seleccion.view.resumenExpediente.InsertarResumenExp', {
    extend: 'Ext.window.Window',
    title: 'Insertar Resumen de Expediente',
    alias: 'widget.insertarResumenExp',
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                items: [{
                        xtype: 'fieldset',
                        title: 'Resumen Expediente',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                                xtype: 'container',
                                margin: '0 10 0 0',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 140,
                                    width: 405
                                },
                                items: [{
                                        xtype: 'combo',
                                        store: 'Aspirantes',
                                        name: 'aspirante',
                                        fieldLabel: 'Aspirante',
                                        displayField: 'nombre',
                                        valueField: 'objeto',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        autoSelect: false,
                                        emptyText: 'Seleccione Aspirante',
                                        displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}</tpl>'),
                                        tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
                                    }, {
                                        xtype: 'textfield',
                                        name: 'ciudad',
                                        fieldLabel: 'Ciudad',
                                        emptyText: 'Inserte el nombre de la Ciudad'
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fecha',
                                        fieldLabel: 'Fecha del Resumen',
                                        emptyText: 'Seleccine fecha del resumen',
                                        format: 'd/m/Y'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'nombreDirector',
                                        fieldLabel: 'Nombre del Director',
                                        emptyText: 'Inserte el Nombre del Director'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'apodo',
                                        fieldLabel: 'Tiene Apodo'
                                    }, {
                                        xtype: 'textarea',
                                        name: 'trayLaboral',
                                        fieldLabel: 'Trayectoria Laboral',
                                        emptyText: 'Inserte la direccion',
                                        height: 20
                                    }, {
                                        xtype: 'textarea',
                                        name: 'trayEstudiantil',
                                        fieldLabel: 'Trayectoria Estudiantil',
                                        emptyText: 'Inserte la Trayectoria Estudiantil',
                                        height: 10
                                    }]
                            }, {
                                xtype: 'container',
                                defaults: {
                                    allowBlank: false,
                                    labelWidth: 140,
                                    width: 405
                                },
                                items: [{
                                        xtype: 'textarea',
                                        name: 'trayRevolucionaria',
                                        fieldLabel: 'Trayectoria Revolucionaria',
                                        emptyText: 'Inserte la Trayectoria Revolucionaria'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: 'Chequeo Medico',
                                        name: 'chequeoMedico'
                                    }, {
                                        xtype: 'numberfield',
                                        fieldLabel: 'Numero de Telefono',
                                        name: 'telefono'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: 'Antecedentes Penales',
                                        name: 'antecPenal'
                                    }, {
                                        xtype: 'textarea',
                                        name: 'conclusiones',
                                        fieldLabel: 'Conclusiones',
                                        emptyText: 'Inserte las conclusiones'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'elaborador',
                                        fieldLabel: 'Elaborador',
                                        emptyText: 'Inserte el nombre del Elaborador'
                                    }, {
                                        xtype: 'datefield',
                                        fieldLabel: 'Fecha de Elaboracion',
                                        name: 'fechaElaborado',
                                        format: 'd/m/Y'
                                    }]
                            }]
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