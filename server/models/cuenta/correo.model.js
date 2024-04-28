const nodemailer = require('nodemailer');
exports.enviarCorreo = async (destino, asunto, texto) => {
    //console.log("INGRESO AL ENVIO DE CORREOS");
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'servicio.acredipucp@gmail.com',
            pass: process.env.ACREDIPUCP_PASSWORD
        }
    }
    //var cuerpo =   "Su codigo es " + codigo +".";
    var mensaje = {
        from: "servicio.acredipucp@gmail.com",
        to: destino,
        subject: asunto,
        text: texto
    }

    try {
        const transporte = nodemailer.createTransport(config);
        const info = await transporte.sendMail(mensaje);
        console.log("Correo enviado:", info.response);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw error;  // Propaga el error para que sea capturado en la función que llamó a enviarCorreo
    }

}