const send_mail = require('../mail/send_mail');

const googleauth = (req, res, db, bcrypt) => {
    let isuser = false;
    db.select('email').from('users').where('email', '=', req.body.email)
    .then(res =>{ isuser = true; console.log('found!')}).catch(err=> console.log('no user found!' + isuser));
    setTimeout(()=>isuser?googleauthchecker(req, res, db, bcrypt):googleregister(req, res, db, bcrypt),150);
}


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
                    send_mail.sendmail(user[0].email,user[0].name);
                    res.json({
                        status: 'sucess',
                        username: user[0].name,
                        id: user[0].id,
                    });
                }).catch(err => res.status(400).json('email error!'));
        }).catch(err => res.status(400).json('error registering in!'));
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
        }).catch(err => res.status(400).json('error logging in!'));
}

module.exports = {
    googleauth
}
