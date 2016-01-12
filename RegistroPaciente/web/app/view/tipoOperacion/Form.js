Ext.define('Registro.view.tipoOperacion.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    alias: 'widget.tipooperacionform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    width: 600,
    initComponent: function () {
        this.items = [{
                name: 'tipo',
                labelWidth: 120,
                fieldLabel: 'Tipo de operaci\u00f3n',
                width: '100%'
            }, {
                xtype: 'gridselectfield',
                store: 'Recursos',
                fromTitle: 'Habilitados',
                allowBlank: true,
                toTitle: 'Seleccionados',
                searchField: 'nombre',
                name: 'tipoOperacionRecursos',
                height: 240,
                flexFrom: 2,
                flexTo: 2,
                pluginsSeleccion: [{
                        ptype: 'rowediting',
                        clickToEdit: 2,
                        saveBtnText: 'Guardar',
                        cancelBtnText: 'Cancelar'
                    }],
                columns: [{
                        xtype: 'rownumberer'
                    }, {
                        header: 'Nombre',
                        dataIndex: 'nombre',
                        flex: 2
                    }, {
                        header: 'Cantidad',
                        dataIndex: 'cantidadRestante',
                        flex: 1,
                        editor: {
                            xtype: 'textfield',
                            name: 'cantidadRestante'
                        }
                    }]
            }];
        //Definimos qué tiene que aparecer en la parte inferior (un botón de guardar).                

        this.callParent(arguments);
    }
});