const nodemailer = require('nodemailer'); 


let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'p2012agarwal@gmail.com', 
		pass: '2001pranav'
	} 
}); 

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
            db.select('id', 'email', 'name','enteries').from('users').where('email', '=', email)
            .then(user=>{
                res.json({
                    status: 'sucess',
                    username: user[0].name,
                    enteries: user[0].enteries,
                    id: user[0].id,
                });
                let mailDetails = { 
                    from: 'pranav@CryptoSathi.com', 
                    to: user[0].email, 
                    subject: 'Welcome, to CryptoSathi', 
                    text: `Hey ${user[0].name}, Thanks for registering!`
                }; 

                mailTransporter.sendMail(mailDetails, function(err, data) { 
                    if(err) { 
                        console.log('Error Occurs'); 
                    } else { 
                        console.log('Email sent successfully'); 
                    } 
                }); 
            }).catch(err=> res.status(400).json('no such user'));
        }).catch(err => res.status(400).json('error'));
}

module.exports = {
    signuphandler
}