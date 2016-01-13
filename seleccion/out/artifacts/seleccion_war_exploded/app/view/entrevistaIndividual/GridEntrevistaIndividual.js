Ext.define('Seleccion.view.entrevistaIndividual.GridEntrevistaIndividual', {
    extend: 'Ext.grid.Panel',
    height: 600,
    store: 'EntrevistasIndividuales',
    alias: 'widget.gridEntrevistaIndividual',
    selType: 'checkboxmodel',
    enableLocking: true,
    forceFit: true,
    tbar: [{
            xtype: 'button',
            text: 'Insertar Entrevista Individual',
            scale: 'medium',
            action: 'nuevo'
        }, {
            xtype: 'button',
            text: 'Eliminar',
            scale: 'medium',
            action: 'eliminar',
            iconCls: 'x-fa fa-trash'
        }],
    bbar: [{
            xtype: 'pagingtoolbar',
            store: 'EntrevistasIndividuales',
            beforePageText: 'P\u00e1gina',
            afterPageText: 'de {0}',
            displayMsg: 'Mostrando {0} - {1} de {2}',
            displayInfo: true,
            pageSize: 22,
            refreshText: 'Actualizando',
            width: '100%'
        }],
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate('<fieldset><legend>Datos Adicionales</legend><p><b>Financiamiento: </b>{financiamiento}, ',
                    '<b>Color de la Piel: </b>{colorPiel}, <b>Color de los Ojos: </b>{colorOjos}, <b>Proficuo: </b>{proficuo}, <b>Numero de Hijos: </b>{numHijos}</p>',
                    '<p><b>Estatura: </b>{estatura}, <b>Nombre de la Madre: </b>{nombreMadre}, <b>Nombre del Padre: </b>{nombrePadre}, <b>Internacionalista: </b><tpl if="siInternacionalista">{paisInternacionalista}<tpl else>No</tpl></p>',
                    '<p><b>Procedencia FAR: </b><tpl if="procedenciaFar">Si<tpl else>No</tpl>, <b>Procedencia MINIT: </b><tpl if="procedenciaFar">Si<tpl else>No</tpl>, <b>Senas Visibles: </b>{senasVisibles}</p>',
                    '</p></fieldset>')
        }],
    initComponent: function () {
        this.columns = [{
                xtype: 'rownumberer'
            }, {
                header: 'Fecha Entrevista',
                dataIndex: 'fechaEntrevista',
                flex: 1
            }, {
                header: 'Num. Expediente',
                dataIndex: 'numExpediente',
                flex: 1
            }, {
                xtype: 'booleancolumn',
                header: 'Paso SMG',
                dataIndex: 'siSmg',
                flex: 0.7,
                trueText: 'Si',
                falseText: 'No'
            }, {
                header: 'Fecha de SMG',
                dataIndex: 'fechaSmg',
                flex: 0.9
            }, {
                header: 'Nombre del Investigador',
                dataIndex: 'nombreEntrevistador',
                flex: 1
            }, {
                header: 'Nivel Escolar',
                dataIndex: 'nivelEscolar',
                flex: 1,
                renderer: function (obj) {
                    return obj.nivelEscolar;
                }
            }, {
                header: 'Aspirante',
                dataIndex: 'aspirante',
                flex: 1,
                renderer: function (obj) {
                    return obj.nombre + ' ' + obj.apellidos;
                }
            }];
        this.callParent(arguments);
        Ext.create('Ext.LoadMask', {
            target: this,
            msg: 'Cargando entrevistas individuales',
            store: this.getStore()
        });
    }
});