Ext.define('Citologia.view.estadistica.ChartPromedioEdad', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartPromedioEdad',
    store: 'PatologiasCuelloGrupoEdades',
    height: 400,
    title: 'Cantidad de Publicaciones por A\u00f1os',
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
            title: ['Entre 25 y 35', 'Entre 36 y 45', 'Entre 46 y 55', '55 y M\u00e1s'],
            xField: 'rangoEdad',
            yField: ['negativo', 'inflamatorio', 'nicI', 'nicII'],
            label: {
                display: 'insideEnd',
                field: ['negativo', 'inflamatorio', 'nicI', 'nicII'],
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
                                mensaje = 'Doctores entre 25 y 35';
                                break;
                            case 'inflamatorio':
                                mensaje = 'Doctores entre 36 y 45';
                                break;
                            case 'nicI':
                                mensaje = 'Doctores entre 46 y 55';
                                break;
                            case 'nicII':
                                mensaje = 'Doctores con m\u00e1s de 56 ';
                                break;
                        }
                        this.setTitle(texto + ': Cantidad de ' + mensaje + ' A\u00f1os: ' + storeItem.get(a.yField));
                    } else {
                        this.setTitle('Cantidad de ' + texto + ' A\u00f1os: ' + storeItem.get(a.yField));
                    }
                }
            }
        }],
    axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['negativo', 'inflamatorio', 'nicI', 'nicII'],
            title: 'Cantidad de Doctores',
            adjustMaximumByMajorUnit: true,
            grid: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['rangoEdad'],
            title: 'Diagnostico Final',
            label: {
                display: 'insideEnd',
                orientation: 'vertical',
                rotate: {degrees: 90}
            }
        }]
});