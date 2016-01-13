Ext.onReady(function () {
    store = Ext.create('Ext.data.Store', {
        fields: ['url', 'tiempo', 'accion', 'usuario'],
        autoLoad: true,
        pageSize: 25,
        proxy: {type: 'ajax', url: 'traza.json', reader: {type: 'json', rootProperty: 'lista'}}
    });
    panel = Ext.create('Ext.grid.Panel', {
        renderTo: 'centro',
        forceFit: true,
        title: 'Lista de Trazas',
        titleAlign: 'center',
        enableLocking: true,
        store: store,
        plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: new Ext.XTemplate('<p style="height:20px;padding:5px;"><b>Acci\u00f3n: </b>{accion}</p>')
            }],
        height: 675,
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
                title: 'Buscar Trazas',
                titleCollapse: true,
                collapsible: true,
                collapsed: true,
                items: [{
                        xtype: 'form',
                        bodyPadding: 5,
                        defaults: {labelWidth: 40, width: 220},
                        layout: {type: 'hbox', defaultMargins: {right: 5}},
                        items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                                width: 200,
                                itemId: 'inicio',
                                vtype: 'rangoFecha',
                                fechaFinal: 'fin',
                                labelWidth: 100,
                                name: 'rangoItiempo'
                            }, {
                                xtype: 'datefield',
                                width: 200,
                                vtype: 'rangoFecha',
                                itemId: 'fin',
                                fechaInicio: 'inicio',
                                labelWidth: 100,
                                fieldLabel: 'Fecha Final',
                                name: 'rangoFtiempo'
                            }, {xtype: 'textfield', fieldLabel: 'Usuario', name: 'usuario'}, {
                                xtype: 'combo',
                                store: {
                                    fields: ['accion'],
                                    data: [{accion: 'Listar'}, {accion: 'Insertar'}, {accion: 'Modificar'}, {accion: 'Eliminar'}]
                                },
                                name: 'likeLaccion',
                                fieldLabel: 'Accion',
                                displayField: 'accion',
                                valueField: 'accion',
                                queryMode: 'local',
                                forceSelection: true,
                                autoSelect: false,
                                emptyText: 'Seleccione Accion'
                            }],
                        buttons: [{
                                text: 'Buscar', scale: 'medium', iconCls: 'fa fa-search-plus fa-1-2x blue', handler: function (bot) {
                                    form = bot.up('form');
                                    grid = form.up('grid');
                                    store = grid.getStore();
                                    values = form.getValues();
                                    store.load({params: {parametros: Ext.encode(values)}});
                                }
                            }, {text: 'Limpiar', scale: 'medium', iconCls: 'fa fa-eraser fa-1-2x blue'}]
                    }]
            }],
        columns: [{xtype: 'rownumberer', width: 50}, {
                header: 'URL',
                dataIndex: 'url',
                flex: 2
            }, {header: 'Tiempo', format: 'd/m/Y h:i:s', dataIndex: 'tiempo', flex: 1.1}, {
                header: 'Usuario',
                dataIndex: 'usuario',
                flex: 1,
                renderer: function (p) {
                    return p.usuario;
                }
            }]
    });
    Ext.create('Ext.LoadMask', {target: panel, msg: 'Cargando trazas...', store: store});
});