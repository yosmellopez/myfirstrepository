Ext.apply(Ext.form.field.VTypes, {
    rangoFecha: function (val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.fechaInicio && (!this.dateRangeMax || (date.getTime() !== this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.fechaInicio);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } else if (field.fechaFinal && (!this.dateRangeMin || (date.getTime() !== this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.fechaFinal);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },
    rangoFechaText: 'La fecha de env\u00edo debe ser menor que la fecha de publicaci\u00f3n',
    vacio: function (val) {
        var regexp = /^[A-ZÑÁÉÓÍÚ][A-ZÑÁÉÓÍÚa-zñáéíóú]{1,}(([,.:;]?\s[A-ZÑÁÉÓÍÚa-zñáéíóú0-9]{1,}){0,})$/;
        return regexp.test(val);
    },
    vacioText: 'El nombre del campo debe comenzar con may\u00fascula.<br/>No debe contener espacios al inicio ni al final.<br/>Si desea insertar n\u00fameros use los n\u00fameros romanos.<br/>No se permiten carateres extraños.',
    apellidos: function (val) {
        var regexp = /^(([a-z]{1,3}\s){0,2}[A-ZÑÁÉÓÍÚ]{1})([a-zñáéíóú\b]{0,})\s([a-z]{1,3}\s){0,2}(\b[A-ZÑÁÉÓÍÚ]{1})([a-zñáéíóú\b]{0,})((\s\b([a-z]{1,3}\s){0,2}[A-ZÑÁÉÓÍÚ]{1}[a-zñáéíóú\b]{0,}){0,2})$/g;
        return regexp.test(val);
    },
    apellidosText: 'Este campo debe tener los siguientes formatos:<br/>Paredes Castillo.<br/>Paredes del Castillo.<br/>Paredes de los Castillos.<br/>Paredes del Castillo y Parreño.',
    nombreVacio: function (val) {
        var regexp = /^[A-ZÑÁÉÓÍÚ]+[A-ZÑÁÉÓÍÚa-zñáéíóú]+([,.:;]?\s([a-z]{1,3}\s){0,2}[\bA-ZÑÍÉÓÁÚ]+[A-ZÑÍÉÓÁÚa-zñáéíóú]*){0,3}$/g;
        return regexp.test(val);
    },
    nombreVacioText: 'El nombre del campo debe comenzar con may\u00fascula.<br/>No debe contener espacios al inicio ni al final.<br/>Si desea insertar n\u00fameros use los n\u00fameros romanos.<br/>No se permiten carateres extraños.',
    nombre: function (val) {
        var regex = /^([A-ZÑÍÉÓÁÚ]{1}[a-zñáéíóú\b]{0,})(\s([a-z]{1,3}\s){0,2}(\b[A-ZÑÍÉÓÁÚ]{1})([a-zñáéíóú\b]{0,})){0,3}$/g;
        return regex.test(val);
    },
    nombreText: 'Este campo debe tener el siguiente formato:<br/>Juan.<br/>Manuel Alejandro.<br/>Miguel del Castillo.<br/>Mar\u00eda de los \u00c1ngeles',
    usuario: function (val) {
        var regex = /^([A-Za-z0-9]+)$/;
        return regex.test(val);
    },
    usuarioText: 'El nombre de usuario no debe contener espacios en blanco,ni caracteres extra\u00f1os,ni tildes.',
    facultad: function (val) {
        var regex = /([A-ZÑÍÉÓÍÚ]{1,}[a-zñáéíóú\b]{1,}){1,5}$/;
        return regex.test(val);
    },
    tituloText: 'El t\u00edtulo no debe estar completamente en may\u00fascula.<br/>No debe contener espacios al inicio ni al final.<br/>No debe contener caracteres extra\u00f1os',
    ci: function (val) {
        year = parseInt(val.substring(0, 2));
        month = parseInt(val.substring(2, 4));
        date = parseInt(val.substring(4, 6));
        if (val.length !== 11)
            return false;
        if (month < 13 && month > 0) {
            if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                if (date < 32 && date > 0)
                    return true;
                return false;
            } else if (month === 4 || month === 6 || month === 9 || month === 11) {
                if (date < 31 && date > 0)
                    return true;
                return false;
            } else if (year % 4 === 0) {
                if (date < 30 && date > 0)
                    return true;
                return false;
            } else {
                if (date < 29 && date > 0)
                    return true;
                return false;
            }
        } else
            return false;
    },
    ciText: 'Carnet de Identidad no V\u00e1lido. Verif\u00edquelo.'
});