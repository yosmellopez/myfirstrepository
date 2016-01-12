Ext.define('CRUD.view.curso.ModificarCurso', {
    extend: 'Ext.window.Window',
    title: 'Modificar Curso',
    alias: 'widget.modificarCurso',
    width: 430,
    modal: true,
    initComponent: function () {
        this.items = [{
                xtype: 'form',
                bodyPadding: 5,
                contador: true,
                defaults: {
                    allowBlank: false,
                    labelWidth: 140,
                    width: 405
                },
                items: [{
                        xtype: 'textfield',
                        name: 'nombre',
                        fieldLabel: 'Nombre',
                        emptyText: 'Inserte el nombre'
                    }, {
                        xtype: 'numberfield',
                        name: 'horas',
                        fieldLabel: 'Cantidad de Horas',
                        emptyText: 'Inserte Cantidad de Horas'
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
