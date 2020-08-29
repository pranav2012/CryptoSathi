const nodemailer = require('nodemailer');

const sendmail = (email,name) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.sender_email,
            pass: process.env.sender_pass
        }
    });

    let mailDetails = {
        from: 'from pranav@Cryptosathi.com' + '<' + process.env.sender_email + '>',
        to: email,
        subject: 'Welcome, to CryptoSathi',
        text: `Hey ${name}, Thanks for registering!`
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = {
    sendmail
}