const handleSignin=(req, res,db,bcrypt) => {

    const { email, password } = req.body;

    if (!email||!password){
        return res.status(400).json("incorrect form submission");
    }
  

    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(response=>{
        //response of hash will be the hash value
       
        const isValid=bcrypt.compareSync(req.body.password,response[0].hash);
        
        if (isValid){
            return db.select('*').from('users').where('email','=',req.body.email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=>res.status(400).json('Unable to get user'))
        }else{
            res.status(400).json("wrong credentials")
        }

    }).catch(err=>res.status(400).json('wrong credentials'));

  
}



module.exports={
    handleSignin:handleSignin
}
