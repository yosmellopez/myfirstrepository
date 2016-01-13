Ext.define('Seleccion.view.datosAspirante.InsertarDatosAspirante', {
    extend: 'Ext.window.Window',
    title: 'Insertar Datos del Aspirante',
    alias: 'widget.insertarDAtosAspirante',
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
                        xtype: 'textfiel',
                        name: 'antecedentePatologico',
                        fieldLabel: 'Antecedente Patologico',
                        emptyText: 'Inserte antecedente patologico'
                    },
                {
                        xtype: 'textfiel',
                        name: 'antecedentePenal',
                        fieldLabel: 'Antecedente Penal',
                        emptyText: 'Inserte antecedente penal'
                    },
                {
                        xtype: 'textfiel',
                        name: 'antecedenteFamiliar',
                        fieldLabel: 'Antecedente Familiar',
                        emptyText: 'Inserte antecedente familiar'
                    },
                {
                        xtype: 'textfiel',
                        name: 'numHijos',
                        fieldLabel: 'Numero de hijos',
                        emptyText: 'Insertenumero dehijos'
                    },
                {
                        xtype: 'textfiel',
                        name: 'problemaFamiliar',
                        fieldLabel: 'Problema Familiar',
                        emptyText: 'Inserte problemas familiares'
                    },
                {
                        xtype: 'textfiel',
                        name: 'personasConvivencia',
                        fieldLabel: 'Personas de Convivencia',
                        emptyText: 'Inserte persoanasde convivencia'
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


