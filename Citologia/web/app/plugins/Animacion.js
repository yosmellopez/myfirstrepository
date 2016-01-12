Ext.define('Citologia.plugins.Animacion', {
    duration: 2000,
    keyframes: {
        0: {
            opacity: 1,
            x: 300,
            y: 0,
            backgroundColor: 'FF0000'
        },
        20: {
            x: 300,
            opacity: 0.5
        },
        40: {
            x: 300,
            backgroundColor: '0000FF'
        },
        60: {
            y: 80,
            x: 300,
            opacity: 0.3
        },
        80: {
            x: 300,
            width: 200,
            y: 200
        },
        100: {
            x: 300,
            opacity: 1,
            backgroundColor: '00FF00'
        }
    },
    setTarget: function (target) {
        this.target = target;
    }
});