const {Router}= require('express');
const postModel = require('../models/postModel');
const postRoute = Router();

postRoute.get('/',async(req,res)=>{
    const userId = req.body.userId;
    try {
        const posts = await postModel.find({userId});
        res.send({data:posts,msg:'users posts'});
    } catch (error) {
        res.status(400).send({err:error});
    }
})

postRoute.post('/add',async(req, res)=>{
    const userId = req.body.userId;
    const {title, body} = req.body;
    if(title && body && userId){
        try {
            const post = await postModel({title,body,device:'PC',userId});
            post.save();
            res.send('post created successfully');
        } catch (error) {
            res.status(400).send({err:error});
        }
    }else res.status(401).send({ err: 'somme details are missing' })
});

postRoute.patch('/update/:id',async(req, res) => {
    console.log(req.body)
    try {
        await postModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.send('post updated successfully');
    } catch (error) {
        res.status(400).send({err:error});
    }
});

postRoute.delete('/delete/:id',async(req, res) => {
    try {
        await postModel.findByIdAndDelete({_id:req.params.id});
        res.send('post deleted successfully');
    } catch (error) {
        res.status(400).send({err:error});
    }
});

module.exports = postRoute;
