const loginhandler = (req, res, db, bcrypt) => {
    const { username, password } = req.body;
    db.select('id', 'email', 'name', 'hash', 'enteries').from('users').where('email', '=', username).orWhere('username', '=', username)
        .then(user => {
            let pass = bcrypt.compareSync(password, user[0].hash);
            if (pass) {
                res.json({
                    status: 'sucess',
                    username: user[0].name,
                    enteries: user[0].enteries,
                    id: user[0].id,
                });
            }
            else {
                res.status(400).json('Wrong Password or Username');
            }
        })
        .catch(err => res.status(400).json('no such user'))
}

module.exports = {
    loginhandler
}