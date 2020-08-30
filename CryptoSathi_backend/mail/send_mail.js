const nodemailer = require('nodemailer');

const sendmail = (email,name) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS
        }
    });
    let mailDetails = {
        from: `'pranav@cryptosathi.com' <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: 'Welcome, to CryptoSathi',
        text: `Hey ${name}, Thanks for registering!`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = {
    sendmail
}
