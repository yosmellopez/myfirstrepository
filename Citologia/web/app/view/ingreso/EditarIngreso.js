Ext.define('Citologia.view.ingreso.EditarIngreso', {
    extend: 'Ext.window.Window',
    alias: 'widget.aliaseditarIngreso',
    title: 'Modificar Ingreso',
    layout: 'fit',
    modal: true,
    width: 400,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                items: [{
                        xtype: 'panel',
                        border: 0,
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            allowBlank: false,
                            labelWidth: 120
                        },
                        layout: 'anchor',
                        items: [{
                                xtype: 'fieldset',
                                columnWidth: 0.5,
                                title: 'Paciente a ingresar',
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%',
                                    allowBlank: false,
                                    readOnly: true,
                                    labelWidth: 110
                                },
                                items: [{
                                        xtype: 'numberfield',
                                        name: 'historiaClinica',
                                        fieldLabel: 'Historia Clinica',
                                        hideTrigger: true
                                    }, {
                                        xtype: 'textfield',
                                        name: 'nombre',
                                        fieldLabel: 'Nombre'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'primerApellido',
                                        fieldLabel: 'Primer Apellido'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'segundoApellido',
                                        fieldLabel: 'Segundo Apellido'
                                    }]
                            }, {
                                xtype: 'fieldset',
                                columnWidth: 0.5,
                                title: 'Ubicación',
                                defaultType: 'textfield',
                                defaults: {anchor: '100%', labelWidth: 110, allowBlank: false},
                                layout: 'anchor',
                                items: [{
                                        xtype: 'combo',
                                        name: 'sala',
                                        fieldLabel: 'Sala',
                                        store: 'Salas',
                                        valueField: 'csala',
                                        displayField: 'nombreSala',
                                        queryMode: 'local',
                                        action: 'seleccionar',
                                        forceSelection: true,
                                        emptyText: 'Selección Sala'
                                    }, {
                                        xtype: 'combo',
                                        name: 'cama',
                                        fieldLabel: 'Cama Destino',
                                        store: 'Camas',
                                        valueField: 'nCama',
                                        displayField: 'numeroCama',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        emptyText: 'Selección Cama',
                                        displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">{numeroCama} <tpl if="habilitada==true">(Ocupada)<tpl else>(Desocupada)</tpl></tpl>'),
                                        tpl: Ext.create('Ext.XTemplate', '<tpl for="."><div class="x-boundlist-item">{numeroCama} <tpl if="habilitada==true">(Ocupada)<tpl else>(Desocupada)</tpl></div></tpl>')
                                    }, {
                                        xtype: 'panel',
                                        width: 360,
                                        height: 50,
                                        border: 0,
                                        layout: {
                                            type: 'hbox',
                                            defaultMargins: {right: 3}
                                        },
                                        items: [, {
                                                name: 'fecha',
                                                fieldLabel: 'Fecha de ingreso',
                                                xtype: 'datefield',
                                                format: 'd/m/Y',
                                                labelWidth: 110,
                                                width: 263,
                                                maxValue: new Date(),
                                                forceSelection: true,
                                                emptyText: 'Seleccione F.Ingreso'
                                            }, {
                                                xtype: 'fieldcontainer',
                                                defaultType: 'radiofield',
                                                allowBlank: false,
                                                layout: {
                                                    type: 'hbox',
                                                    defaultMargins: {right: 5}
                                                },
                                                items: [{
                                                        boxLabel: 'AM',
                                                        name: 'meridiano',
                                                        inputValue: 'true',
                                                        checked: true
                                                    }, {
                                                        boxLabel: 'PM',
                                                        name: 'meridiano',
                                                        inputValue: 'false'
                                                    }]
                                            }]

                                    }]
                            }]
                    }]

            }],
                this.buttons = [{
                        text: 'Modificar',
                        action: 'modificar'
                    }, {
                        text: 'Cancelar',
                        scope: this,
                        style: {
                            marginRight: '5px'
                        },
                        handler: this.close,
                        iconAlign: 'right'
                    }];
        this.callParent(arguments);
    }
});