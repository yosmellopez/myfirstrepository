Ext.define('Registro.view.especialista.Form', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150,
        width: 368
    },
    alias: 'widget.especialistaform',
    padding: 10,
    style: 'background-color: #fff;',
    border: false,
    initComponent: function () {
        this.items = [{
            name: 'nombre',
            fieldLabel: 'Nombre del Especialista',
            vtype:'nombre'
        }, {
            name: 'apellidos',
            fieldLabel: 'Apellidos del Especialista',
            vtype:'apellidos'
        }, {
            xtype: 'combo',
            name: 'grupo',
            store: 'Grupos',
            displayField: 'grupo',
            valueField: 'objeto',
            fieldLabel: 'Grupo',
            queryMode: 'local',
            displayTpl: Ext.create('Ext.XTemplate', '<tpl for="."><tpl if="grupo.grupo==undefined")>{grupo}<tpl else>{grupo.grupo}</tpl></tpl>')
        }, {
            xtype: 'combo',
            name: 'especialidad',
            fieldLabel: 'Especialidad',
            store: 'Especialidades',
            displayField: 'especialidad',
            valueField: 'objeto',
            queryMode: 'local',
            displayTpl: Ext.create('Ext.XTemplate', '<tpl for="."><tpl if="especialidad.especialidad==undefined")>{especialidad}<tpl else>{especialidad.especialidad}</tpl></tpl>')
        },{
            xtype:'checkbox',
            name:'disponible',
            inputValue: true,
            fieldLabel: 'Disponible'
        }];
        this.callParent(arguments);
    }
});