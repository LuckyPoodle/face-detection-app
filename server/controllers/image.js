const Clarifai=require('clarifai');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app=new Clarifai.App({
    apiKey:process.env.REACT_APP_API_KEY
  });

const handleApiCall=(req,res)=>{

    app.models.predict("a403429f2ddf4b49b307e318f00e528b",req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with api'));

}


const handleImage=(req, res,db) => {

    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {

        
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get count'))
}

module.exports={
    handleImage,
    handleApiCall
}