Ext.define('Seleccion.plugins.GridSelector', {
    extend: 'Ext.form.FieldContainer',
    mixins: {bindable: 'Ext.mixin.Bindable', field: 'Ext.form.field.Field'},
    alternateClassName: 'CRUD.plugins.GridSelector',
    flexFrom: 0,
    flexTo: 0,
    blankText: 'El grid de seleccionar esta vacio',
    noSelectionText: 'El grid de seleccionar esta vacio',
    alias: ['widget.gridselectfield', 'widget.gridselect'],
    hideNavIcons: false,
    buttons: ['add', 'remove', 'addAll', 'removeAll'],
    searchField: '',
    searchAttribute: '',
    leftGridId: 'leftgrid',
    rightGridId: 'rightgrid',
    leftAction: '',
    rightAction: '',
    action: '',
    plugins: false,
    store: {},
    value: [],
    heigth: 230,
    columns: [],
    buttonsText: {
        add: "Insertar Seleccionados",
        remove: "Eliminar Seleccionados",
        addAll: "Insertar Todos",
        removeAll: "Eliminar Todos"
    },
    layout: {type: 'hbox', align: 'stretch'},
    initComponent: function () {
        var me = this;
        me.store = Ext.getStore(me.store);
        clase = me.store.$className;
        me.storeFrom = Ext.create(clase, {autoLoad: false});
        me.storeTo = Ext.create(clase, {autoLoad: false});
        me.pushElements(me.storeFrom, me.store);
        me.items = me.setupItems();
        me.callParent(arguments);
        me.initField();
        me.fireEvent('drop');
    },
    setupItems: function () {
        var me = this;
        me.fromField = me.createListFrom(me.fromTitle);
        me.toField = me.createListTo(me.toTitle);
        return [me.fromField, {
                xtype: 'container',
                margins: '0 4',
                layout: {type: 'vbox', pack: 'center'},
                items: me.createButtons()
            }, me.toField];
    },
    createListFrom: function (title) {
        var me = this;
        return Ext.create('Ext.grid.Panel', {
            submitValue: false,
            getSubmitData: function () {
                return null;
            },
            getModelData: function () {
                return null;
            },
            flex: me.flexFrom,
            forceFit: true,
            id: me.leftGridId,
            action: me.leftAction,
            height: me.heigth,
            selType: 'checkboxmodel',
            dragGroup: me.ddGroup,
            dropGroup: me.ddGroup,
            tbar: [{
                    xtype: 'textfield',
                    enableKeyEvents: true,
                    fieldLabel: 'Buscar',
                    labelWidth: 60,
                    submitValue: false,
                    listeners: {
                        keyup: function (text) {
                            store = me.storeFrom;
                            value = text.getValue();
                            store.filter({
                                filterFn: function (reg) {
                                    if (me.searchAttribute === '')
                                        return Ext.String.startsWith(reg.get(me.searchField), value);
                                    return Ext.String.startsWith(reg.get(me.searchField)[me.searchAttribute], value);
                                }
                            });
                        }
                    }
                }],
            title: title,
            columns: me.columns,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    ddGroup: 'multiselector',
                    dropGroup: 'miselector',
                    dragGroup: 'miselector'
                }
            },
            store: me.storeFrom
        });
    },
    createListTo: function (title) {
        var me = this;
        me.plugins = me.plugins === false ? [] : me.plugins;
        return Ext.create('Ext.grid.Panel', {
            submitValue: false,
            getSubmitData: function () {
                return null;
            },
            getModelData: function () {
                return null;
            },
            flex: me.flexTo,
            dragGroup: me.ddGroup,
            dropGroup: me.ddGroup,
            title: title,
            id: me.rightGridId,
            action: me.rightAction,
            forceFit: true,
            height: me.heigth,
            selType: 'checkboxmodel',
            columns: me.columns,
            viewConfig: {
                plugins: [{
                        ptype: 'gridviewdragdrop',
                        ddGroup: 'multiselector',
                        dropGroup: 'miselector',
                        dragGroup: 'miselector'
                    }]
            },
            plugins: me.plugins,
            store: me.storeTo
        });
    },
    createButtons: function () {
        var me = this, buttons = [];
        if (!me.hideNavIcons) {
            Ext.Array.forEach(me.buttons, function (name) {
                buttons.push({
                    xtype: 'button',
                    tooltip: me.buttonsText[name],
                    handler: me['on' + Ext.String.capitalize(name) + 'BtnClick'],
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-' + name,
                    action: me.action,
                    navBtn: true,
                    scope: me,
                    margin: '4 0 0 0'
                });
            });
        }
        return buttons;
    },
    getValue: function () {
        var me = this, store = me.storeTo;
        me.value = new Array();
        store.each(function (reg) {
            me.value.push(reg.data);
        });
        return me.value;
    },
    getSubmitValue: function () {
        return this.getValue();
    },
    getSubmitData: function () {
        var me = this, data = null, val;
        val = me.getSubmitValue();
        if (val !== null) {
            data = {};
            data[me.getName()] = val;
        }
        return data;
    },
    onAddBtnClick: function () {
        var list = this.fromField, store = list.getStore(), selected = this.getSelections(list), stTo = this.storeTo;
        store.remove(selected);
        stTo.insert(0, selected);
        this.toField.getSelectionModel().select(selected);
    },
    onRemoveBtnClick: function () {
        var list = this.toField, store = list.getStore(), stFrom = this.storeFrom, selected = this.getSelections(list);
        stFrom.add(selected);
        store.remove(selected);
        if (selected.length !== 0) {
            stFrom.sort([{property: selected[0].fields.keys[0], direction: 'ASC'}]);
        }
        list.getSelectionModel().select(selected);
    },
    onAddAllBtnClick: function () {
        var list = this.fromField, store = list.getStore(), storeTo = this.storeTo, selected = store.getRange();
        storeTo.add(selected);
        store.removeAll();
        list.getSelectionModel().select(selected);
    },
    onRemoveAllBtnClick: function () {
        var list = this.toField, store = list.getStore(), storeFrom = this.storeFrom, selected = store.getRange();
        storeFrom.add(selected);
        store.removeAll();
        if (selected.length !== 0) {
            storeFrom.sort([{property: selected[0].fields.keys[0], direction: 'ASC'}]);
        }
        list.getSelectionModel().select(selected);
    },
    getSelections: function (list) {
        return list.getSelectionModel().getSelection();
    },
    pushElements: function (storeFrom, store) {
        store.each(function (reg) {
            storeFrom.add(reg);
        });
    },
    isValid: function () {
        var me = this,
                disabled = me.disabled,
                validate = me.forceValidation || !disabled;
        return validate ? me.validateValue(me.value) : disabled;
    },
    validateValue: function (value) {
        var me = this,
                errors = me.getErrors(value),
                isValid = Ext.isEmpty(errors);

        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                me.markInvalid(errors);
            }
        }
        return isValid;
    },
    markInvalid: function (errors) {
        var me = this, oldMsg = me.getActiveError();
        me.setActiveErrors(Ext.Array.from(errors));
        if (oldMsg !== me.getActiveError()) {
            me.toField.addCls(Ext.baseCSSPrefix + 'form-invalid-field');
            me.updateLayout();
        }
    },
    clearInvalid: function () {
        var me = this, hadError = me.hasActiveError();
        me.unsetActiveError();
        if (hadError) {
            me.updateLayout();
            me.toField.removeCls(Ext.baseCSSPrefix + 'form-invalid-field');
        }
    },
    getErrors: function () {
        var me = this, errors = [], numSelected, store = me.storeTo;
        numSelected = me.value.length;
        if (!me.allowBlank && numSelected < 1) {
            errors.push(me.blankText);
        }
        if (store.count() === 0)
            errors.push(me.noSelectionText);
        return errors;
    },
    clearValue: function () {
        this.setValue([]);
    },
    getStore: function () {
        return this.store;
    }
});