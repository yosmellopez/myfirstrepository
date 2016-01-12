Ext.onReady(function () {
    store = Ext.create('Ext.data.Store', {
        fields: ['url', 'fecha', 'accion', 'usuario'],
        autoLoad: true,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: 'traza.json',
            reader: {
                type: 'json',
                root: 'lista'
            }
        }
    });
    panel = Ext.create('Ext.grid.Panel', {
        title: '<span style="font-size:12px;">Listado de Trazas</span>',
        renderTo: 'contenido',
        forceFit: true,
        enableLocking: true,
        cls: 'panel-body',
        store: store,
        plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: new Ext.XTemplate('<p style="height:20px;padding:5px;"><b>Acci\u00f3n: </b>{accion}</p>')
            }],
        height: 615,
        dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                store: store,
                beforePageText: 'P\u00e1gina',
                afterPageText: 'de {0}',
                displayInfo: true
            }, {
                dock: 'top',
                xtype: 'panel',
                title: '<i class="fa fa-search"></i>Buscar Trazas',
                titleCollapse: true,
                collapsible: true,
                collapsed: true,
                items: [{
                        xtype: 'form',
                        bodyPadding: 5,
                        defaults: {
                            labelWidth: 40,
                            width: 220
                        },
                        layout: {
                            type: 'hbox',
                            defaultMargins: {right: 5}
                        },
                        items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                                itemId: 'inicio',
                                editable: false,
                                vtype: 'rangoFecha',
                                fechaFinal: 'fin',
                                labelWidth: 90,
                                name: 'rangoIfecha'
                            }, {
                                xtype: 'datefield',
                                vtype: 'rangoFecha',
                                itemId: 'fin',
                                editable: false,
                                fechaInicio: 'inicio',
                                labelWidth: 90,
                                fieldLabel: 'Fecha Final',
                                name: 'rangoFfecha'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Usuario',
                                name: 'likeLusuario.usuario',
                                width: 210
                            }, {
                                xtype: 'combo',
                                store: {
                                    fields: ['accion'],
                                    data: [
                                        {accion: 'Listar'},
                                        {accion: 'Insertar'},
                                        {accion: 'Modificar'},
                                        {accion: 'Eliminar'}
                                    ]
                                },
                                name: 'likeLaccion',
                                fieldLabel: 'Accion',
                                displayField: 'accion',
                                valueField: 'accion',
                                editable: false,
                                queryMode: 'local',
                                forceSelection: true,
                                autoSelect: false,
                                emptyText: 'Seleccione Accion'
                            }],
                        buttons: [{
                                text: 'Buscar',
                                scale: 'medium',
                                iconCls: 'buscar',
                                handler: function (bot) {
                                    form = bot.up('form');
                                    grid = form.up('grid');
                                    store = grid.getStore();
                                    values = form.getValues();
                                    store.load({params: {parametros: Ext.encode(values)}, callback: function (r, o, s) {
                                            if (!s) {
                                                console.log(o.getResultSet());
                                            }
                                        }});
                                }
                            }, {
                                text: 'Limpiar',
                                scale: 'medium',
                                iconCls: 'limpiar'
                            }]
                    }]
            }],
        columns: [{
                header: 'No',
                xtype: 'rownumberer',
                width: 50
            }, {
                header: 'URL',
                dataIndex: 'url',
                flex: 2
            }, {
                header: 'Tiempo',
                format: 'd/m/Y h:i:s',
                dataIndex: 'fecha',
                flex: 1
            }, {
                header: 'Usuario',
                dataIndex: 'usuario',
                width: 190,
                renderer: function (p) {
                    return p.usuario;
                }
            }]
    });
});