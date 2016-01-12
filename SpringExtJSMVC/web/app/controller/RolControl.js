Ext.define('CRUD.controller.RolControl', {
    extend: 'Ext.app.Controller',
    views: ['rol.GridRol', 'rol.NuevoRol'],
    stores: ['Roles'],
    models: ['Rol'],
    refs: [{
        ref: 'grid',
        selector: 'gridrol'
    }],
    init: function () {
        this.control({
            'gridrol button[action=nuevo]': {
                click: this.nuevo
            },
            'nuevoRol button[action=insertar]': {
                click: this.insertar
            }
        });
    },
    nuevo: function (button) {
        win = Ext.widget('nuevoRol');
        win.show(button);
    },
    insertar: function (buton) {
        win = buton.up('window');
        form = win.down('form');
        basicForm = form.getForm();
        if (basicForm.isValid()) {
            store = this.getRolesStore();
            valores = basicForm.getValues();
            record = Ext.create('CRUD.model.Rol', valores);
            store.add(record);
            win.setLoading('Insertando rol...');
            store.sync({
                success: function () {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: 'Rol insertado exitosamente',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                },
                failure: function (action) {
                    Ext.Msg.show({
                        title: 'Informaci\u00f3n',
                        msg: action.proxy.reader.jsonData.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    store.rejectChanges();
                    win.setLoading(false);
                }
            });
        } else
            Ext.Msg.show({
                title: 'Informaci\u00f3n',
                icon: Ext.Msg.INFO,
                msg: 'El formulario contiene errores',
                buttons: Ext.Msg.OK
            });
    }
});
