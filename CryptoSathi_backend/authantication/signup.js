const send_mail = require('../mail/send_mail');

const signuphandler = (req, res, db ,bcrypt) => {
    const { name, username, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joined: new Date(),
            username: username,
            hash: hash
        })
        .then(result => {
            db.select('id', 'email', 'name').from('users').where('email', '=', email)
            .then(user=>{
                send_mail.sendmail(user[0].email,user[0].name);
                res.json({
                    status: 'sucess',
                    username: user[0].name,
                    id: user[0].id,
                });
            }).catch(err=> res.status(400).json('email error!'));
        }).catch(err => res.status(400).json('error'));
}

module.exports = {
    signuphandler
}
