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
                store: 'tiposRecursos',
                fromTitle: 'Habilitados',
                allowBlank: true,
                toTitle: 'Seleccionados',
                searchField: 'nombre',
                name: 'tipoOperacionRecursos',
                changeValue: true,
                fnChangeValue: function (value) {
                    elems = new Array();
                    for (i = 0; i < value.length; i++) {
                        elems.push({idRecurso: value[i].recurso.idRecurso, nombre: value[i].recurso.nombre, cantidadRestante: value[i].cantidad});
                    }
                    return elems;
                },
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
                        flex: 2,
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