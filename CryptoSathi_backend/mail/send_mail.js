const nodemailer = require('nodemailer');

const sendmail = (email,name) => {
    let error = '';
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS
        }
    });
    let mailDetails = {
        from: 'from pranav@Cryptosathi.com' + '<' + process.env.SENDER_EMAIL + '>',
        to: email,
        subject: 'Welcome, to CryptoSathi',
        text: `Hey ${name}, Thanks for registering!`
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            error='error';
            console.log('Error Occurs');
        } else {
            error='sent'
            console.log('Email sent successfully');
        }
    });
    return error;
}

module.exports = {
    sendmail
}