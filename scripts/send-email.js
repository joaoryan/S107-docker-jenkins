// Importar o módulo Nodemailer
const nodemailer = require('nodemailer');

// Configurar o transporte
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sjoaoryan@gmail.com',
        pass: 'lubq nnut ghhf oelq'
    }
});

// Configurar o e-mail
const mailOptions = {
    from: 'sjoaoryan@gmail.com',
    to: 'testes107email@gmail.com',
    subject: 'PIPELINE',
    text: 'A pipeline está em execução'
};

// Enviar o e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('E-mail enviado: ' + info.response);
    }
});
