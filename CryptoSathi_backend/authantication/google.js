const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'himeshkumar148@gmail.com',
        pass: '2001pranav'
    }
});

const googleregister = (req, res, db, bcrypt) => {
    const { name, email, username } = req.body;
    const hash = bcrypt.hashSync(email);
    db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joined: new Date(),
            username: username,
            hash: hash
        }).then(result => {
            db.select('id', 'email', 'name').from('users').where('email', '=', email)
                .then(user => {
                    res.json({
                        status: 'sucess',
                        username: user[0].name,
                        id: user[0].id,
                    });
                    let mailDetails = {
                        from: 'Pranav from @gmail.com <himeshkumar48@gmail.com>',
                        to: user[0].email,
                        subject: 'Welcome, to CryptoSathi',
                        text: `Hey ${user[0].name}, Thanks for registering!`
                    };

                    mailTransporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            console.log('Error Occurs');
                        } else {
                            console.log('Email sent successfully');
                        }
                    });
                }).catch(err => res.status(400).json('no such user'));
        })
        .catch(err => res.status(400).json('error'));
}

const googleauthchecker = (req, res, db) => {
    const { email } = req.body;
    db.select('id', 'email', 'name').from('users').where('email', '=', email)
        .then(user => {
            res.json({
                status: 'sucess',
                username: user[0].name,
                id: user[0].id,
            });
        })
        .catch(err => res.status(400).json('error'));
}

module.exports = {
    googleauthchecker,
    googleregister
}