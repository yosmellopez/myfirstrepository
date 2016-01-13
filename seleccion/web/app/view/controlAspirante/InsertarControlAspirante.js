Ext.define('Seleccion.view.controlAspirante.InsertarControlAspirante', {
    extend: 'Ext.window.Window',
    title: 'Insertar Control de Aspirante',
    alias: 'widget.insertarControlAspirante',
    width: 430,
    modal: true,
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
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                                xtype: 'radio',
                                name: 'expProceso',
                                margin: '0 20 0 0',
                                labelWidth: 160,
                                fieldLabel: 'Expediente en Proceso',
                                inputValue: true
                            }, {
                                xtype: 'radio',
                                name: 'expProceso',
                                labelWidth: 160,
                                margin: '0 0 0 20',
                                fieldLabel: 'Expediente Culminado',
                                inputValue: false
                            }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Aprobado por MININT',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                                xtype: 'radio',
                                name: 'aprobadoMinint',
                                labelWidth: 20,
                                margin: '0 20 0 30',
                                checked: true,
                                fieldLabel: 'Si',
                                inputValue: true
                            }, {
                                xtype: 'radio',
                                name: 'aprobadoMinint',
                                margin: '0 0 0 20',
                                labelWidth: 20,
                                fieldLabel: 'No',
                                inputValue: false
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Observaciones',
                        defaults: {
                            allowBlank: false,
                            labelWidth: 140,
                            width: 370
                        },
                        items: [{
                                xtype: 'datefield',
                                name: 'fechaPresentacion',
                                fieldLabel: 'Fecha de Presentaci\u00f3n',
                                editable: false,
                                emptyText: 'Seleccione fecha de presentaci\u00f3n',
                                format: 'd/m/Y',
                                itemId: 'fechaInicio',
                                fechaFinal: 'fechaFinal',
                                vtype: 'rangoFecha'
                            }, {
                                xtype: 'datefield',
                                name: 'fechaBaja',
                                editable: false,
                                fieldLabel: 'Fecha de Baja',
                                emptyText: 'Seleccione fecha de Baja',
                                format: 'd/m/Y',
                                itemId: 'fechaFinal',
                                fechaInicio: 'fechaInicio',
                                vtype: 'rangoFecha'
                            }, {
                                xtype: 'textfield',
                                name: 'motivoBaja',
                                fieldLabel: 'Motivo de Baja',
                                emptyText: 'Inserte Motivo de Baja'
                            }, {
                                xtype: 'combo',
                                store: 'Aspirantes',
                                name: 'aspirante',
                                fieldLabel: 'Aspirante',
                                displayField: 'nombre',
                                valueField: 'objeto',
                                allowBlank: false,
                                queryMode: 'local',
                                forceSelection: true,
                                autoSelect: false,
                                emptyText: 'Seleccione Aspirante',
                                displayTpl: new Ext.XTemplate('<tpl for=".">{nombre} {apellidos}</tpl>'),
                                tpl: new Ext.XTemplate('<tpl for="."><div class="x-boundlist-item">{nombre} {apellidos}</div></tpl>')
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

