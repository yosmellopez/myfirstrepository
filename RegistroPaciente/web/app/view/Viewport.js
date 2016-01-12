Ext.define('Registro.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    requires: [
        'Registro.view.usuario.Form'
//        'Registro.view.usuario.Grid'
//        'Registro.view.usuario.Window'
    ],
    initComponent: function () {

        this.items = {
            layout: {
                type: 'border',
                align: 'stretch'
            },
            items: [{
                    region: 'west',
                    collapsible: true,
                    title: 'Menú',
                    width: 150,
                    split: true
                }, {
                    region: 'south',
                    title: 'Panel inferior',
                    collapsible: true,
                    split: true,
                    height: 100,
                    minHeight: 100
                }, {
                    region: 'east',
                    title: 'Panel lateral',
                    collapsible: true,
                    split: true,
                    width: 150
                }, {
                    region: 'center',
                    xtype: 'tabpanel',
                    activeTab: 9,
                    items: [{
                            title: 'Usuarios',
                            xtype: 'gridUsuario'
                        }, {
                            title: 'Areas de Salud',
                            xtype: 'gridAreaSalud'
                        }, {
                            title: 'Causas',
                            xtype: 'gridCausa'
                        }, {
                            title: 'Especialidad',
                            xtype: 'gridEspecialidad'
                        }, {
                            title: 'Especialista',
                            xtype: 'gridEspecialista'
                        }, {
                            title: 'Grupos',
                            xtype: 'gridGrupo'
                        }, {
                            title: 'Lista de Espera',
                            xtype: 'gridListaEspera'
                        }, {
                            title: 'Lista de Operacion',
                            xtype: 'gridOperacion'
                        }, {
                            title: 'Recursos de Operación',
                            xtype: 'gridOperacionRecurso'
                        }, {
                            title: 'Paciente',
                            xtype: 'gridPaciente'
                        }]
                }]
        };
        this.callParent();
    }
});