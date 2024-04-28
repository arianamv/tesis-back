const cron = require('node-cron');
const path = require('path');
const { fork } = require('child_process');

// Ruta del script de recordatorio
const recordatorioScriptPath = path.resolve(__dirname, 'recordatorio.js');

// Tarea programada: ejecutar el script a las 4 am todos los días
cron.schedule('21 0 * * *', () => {
    const proceso = fork(recordatorioScriptPath);
    proceso.on('exit', (code) => {
        if (code !== 0) {
            console.error(`El script terminó con código de salida ${code}`);
        }
    });
});