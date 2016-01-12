Ext.define('Postgrado.view.doctor.BusquedaDoctor', {
    extend: 'Ext.form.Panel',
    title: '<i class="fa fa-search-plus"></i>Buscar Doctores',
    alias: 'widget.busquedadoctor',
//    width: 470,
    collapsible: true,
    bodyPadding: 5,
    collapsed: true,
    titleCollapse: true,
    layout: {type: 'hbox', defaultMargins: {right: 10}},
    initComponent: function () {
        this.items = [{
                xtype: 'textfield',
                name: 'nombre',
                fieldLabel: 'Nombre',
                emptyText: 'Inserte nombre'
            }, {
                xtype: 'textfield',
                name: 'apellidos',
                fieldLabel: 'Apellidos',
                emptyText: 'Inserte apellidos'
            }, {
                xtype: 'textfield',
                name: 'usuario',
                fieldLabel: 'Nombre de Usuario',
                emptyText: 'Inserte nombre de usuario'
            }, {
                xtype: 'combo',
                store: 'Roles',
                name: 'rol',
                fieldLabel: 'Rol',
                displayField: 'rol',
                valueField: 'objeto',
                allowBlank: false,
                queryMode: 'local',
                forceSelection: true,
                autoSelect: false,
                emptyText: 'Seleccione Rol'
            }];
        this.buttons = [{
                text: 'Buscar',
                scale: 'medium',
                iconCls: 'fa fa-search-plus fa-1-2x blue',
                action: 'buscar'
            }, {
                text: 'Limpiar',
                scope: this,
                iconCls: 'fa fa-eraser fa-1-2x blue',
                scale: 'medium',
                handler: function (bot) {
                    bot.up('form').getForm().reset();
                }
            }];
        this.callParent(arguments);
    },
    listeners: {
        collapse: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            centro = Ext.get('panelcentro');
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
            centro.animate({duration: 100, from: {height: altura}, to: {height: altura - 250}});
        }, expand: function (panel) {
            grid = panel.up('grid');
            altura = grid.getHeight();
            centro = Ext.get('panelcentro');
            grid.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
            centro.animate({duration: 100, from: {height: altura}, to: {height: altura + 250}});
        }
    }
});