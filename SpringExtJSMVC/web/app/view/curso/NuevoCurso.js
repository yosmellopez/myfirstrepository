Ext.define('CRUD.view.curso.NuevoCurso', {
    extend: 'Ext.window.Window',
    title: 'Nuevo Curso',
    alias: 'widget.nuevoCurso',
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
                defaultFocus: 'textfield[name=nombre]',
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
                action: 'insertar'
            }, {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});

