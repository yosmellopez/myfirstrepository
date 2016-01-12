Ext.define('Registro.view.usuario.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.usuarioform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
                name: 'usuario',
                fieldLabel: 'Nombre de Usuario',
                vtype:'usuario'
            }, {
                name: 'contrasena',
                fieldLabel: 'Contrasena',
                inputType: 'password'
            }, {
                name: 'nombre',
                fieldLabel: 'Nombre',
                vtype:'nombre'
            }, {
                name: 'apellidos',
                fieldLabel: 'Apellidos',
                vtype:'apellidos'
            }, {
                xtype: 'combo',
                store: 'Roles',
                name: 'rol',
                fieldLabel: 'Rol',
                displayField: 'rol',
                valueField: 'objeto',
                allowBlank: false,
                queryMode: 'local',
                autoSelect: false,
                emptyText: 'Seleccione Rol',
                displayTpl: Ext.create('Ext.XTemplate', '<tpl for="."><tpl if="rol.rol==undefined")>{rol}<tpl else>{rol.rol}</tpl></tpl>')
            }];
        this.callParent(arguments);
    }
});