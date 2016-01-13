Ext.define('Citologia.view.estadistica.ChartEstadisticaMensual', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartEstadisticaMensual',
    store: 'EstadisticasMensuales',
    height: 400,
    title: 'Estadistica Mensual',
    animate: true,
    width: '100%',
    cls: 'x-panel-body-default',
    legend: {
        position: 'bottom'
    },
    style: {
        zIndex: 10000000000
    },
    series: [{
            type: 'column',
            highlight: {size: 7, radius: 7},
            smooth: true,
            axis: 'left',
            title: ['No \u00datil', 'Negativo C\u00e9lulas Malignas', 'Positivo C\u00e9lulas Malignas'],
            xField: 'area',
            yField: ['negativo', 'noUtil', 'infectadas'],
            label: {
                display: 'insideEnd',
                field: ['negativo', 'noUtil', 'infectadas'],
                orientation: 'horizontal',
                color: '#333'
            },
            tips: {
                trackMouse: true,
                width: 330,
                height: 28,
                renderer: function (storeItem, a) {
                    texto = storeItem.get('rangoEdad');
                    if (texto !== 'Doctores de la Universidad') {
                        mensaje = '';
                        switch (a.yField) {
                            case 'negativo':
                                mensaje = 'Negativo';
                                break;
                            case 'noUtil':
                                mensaje = 'No \u00datil';
                                break;
                            case 'infectadas':
                                mensaje = 'Positivo';
                                break;
                        }
                        this.setTitle(texto + ': Cantidad de ' + mensaje + ' : ' + storeItem.get(a.yField));
                    } else {
                        this.setTitle('Cantidad de ' + texto + ' : ' + storeItem.get(a.yField));
                    }
                }
            }
        }],
    axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['negativo', 'noUtil', 'infectadas'],
            title: 'Cantidad',
            adjustMaximumByMajorUnit: true,
            grid: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['area'],
            title: '\u00c1rea',
            label: {
                display: 'insideEnd',
                orientation: 'vertical',
                rotate: {degrees: 90}
            }
        }]
});