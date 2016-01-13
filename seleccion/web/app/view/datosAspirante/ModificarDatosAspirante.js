Ext.define('Seleccion.view.datosAspirante.ModificarDatosAspirante', {
    extend: 'Ext.window.Window',
    title: 'Editar Datos del Aspirante',
    alias: 'widget.modificarDatosAspirante',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                defaults: {
                    allowBlank: false,
                    labelWidth: 160,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'antecedentePatologico',
                        fieldLabel: 'Antecedente Patologico',
                        emptyText: 'Inserte antecedente patologico'
                    }, {
                        xtype: 'textfield',
                        name: 'antecedentePenal',
                        fieldLabel: 'Antecedente Penal',
                        emptyText: 'Inserte antecedente penal'
                    }, {
                        xtype: 'textfield',
                        name: 'antecedenteFamiliar',
                        fieldLabel: 'Antecedente Familiar',
                        emptyText: 'Inserte antecedente familiar'
                    }, {
                        xtype: 'numberfield',
                        name: 'numHijos',
                        fieldLabel: 'Numero de hijos',
                        emptyText: 'Insertenumero dehijos'
                    }, {
                        xtype: 'textfield',
                        name: 'problemaFamiliar',
                        fieldLabel: 'Problema Familiar',
                        emptyText: 'Inserte problemas familiares'
                    }, {
                        xtype: 'textfield',
                        name: 'personasConvivencia',
                        fieldLabel: 'Personas de Convivencia',
                        emptyText: 'Inserte persoanasde convivencia'
                    }]
            }];
        this.buttons = [{
                text: 'Guardar',
                action: 'modificar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});




