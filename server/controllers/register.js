const handleRegister=(req, res,db,bcrypt) => {
    const { email, name, password } = req.body;

    if (!email||!name||!password){
        return res.status(400).json("incorrect form submission");
    }

    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,

        })
            .into('login')
            .returning('email')
            .then(loginemail => {
                //insert to pg db
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginemail[0],
                        joined: new Date(),
                        name: name //entries default 0, the others auto generated
                    }).then(response => {
                        res.json(response[0]);

                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
}).catch(err => res.status(400).json("Unable to register"));

}

module.exports={
    handleRegister:handleRegister
}
