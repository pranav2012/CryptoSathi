const send_mail = require('../mail/send_mail');

const googleregister = (req, res, db, bcrypt) => {
    const { name, email, username } = req.body;
    const hash = bcrypt.hashSync(email);
    const mail = (user) =>{ return send_mail.sendmail(user.email,user.name)}
    let error = '';


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
                    setTimeout(()=>{error = mail(user[0])}, 200);
                }).catch(err => res.status(400).json('email error: ' + error));
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