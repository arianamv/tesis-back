const Medicion = require('../models/medicion/medicion.model');

const moment = require('moment');

const enviarRecordatorios = async () => {
    const fechaHoy = moment().format('YYYY-MM-DD');

    Medicion.enviarCorreosRecordatorios(fechaHoy, (error, results) => {
        if (error) {
            console.error('Error al obtener las mediciones pendientes:', error);
            return;
        }
        
        console.log('Recordatorio enviado a los siguientes correos:', results);
    });
};

enviarRecordatorios();