const express = require('express');
const route = express.Router();
const teacherModel = require('./teacher');
//create the teacher record
route.post('/teacher', async (req,res)=>{
    try {
         const value = req.body;
        const teacher = new teacherModel(value);
       const savedData =  await teacher.save()
       
        res.status(200).send(`${savedData.Name} data has been saved successfully!`);
    } 
    catch (error) {
        console.log(error.errmsg);
        res.status(500).send(error.errmsg);
    }
})
//Get / read all teacher record
route.get('/teacher', async(req,res)=>{
       try{
           const teacherRec = await teacherModel.find();
           res.status(200).send(teacherRec);
       }
       catch(err){
             console.error(err);
             res.status(500).send(err);
       }
})
route.put('/teacher/:email',async (req,res)=>{
      try{
        const email = req.params.email;
        console.log(req);
        const quary = req.body;
        const updatedData = await teacherModel.findOneAndUpdate({email_ID:email},{$set:quary},{new:true});
        if(!updatedData){
            res.status(404).send("User not found");
        }
        else{
            res.status(202).send(updatedData.Name," value has been changed");
        }
      }
      catch(err){
         res.status(505).json(err);
      }
})
route.delete('/teacher/:email', async (req,res)=>{
    try{
    const email = req.params.email;
    const objToDelete = await teacherModel.findOne({email_ID:email});
    const deletedNum = await teacherModel.deleteOne({email_ID:email});
    if(deletedNum===0){
        res.status(404).send("Data not found");
    }
    else{
        res.status(200).send(`${objToDelete.Name} deleted succesfully`);
    }
}
catch(err){
    res.status(505).send(err);
}
})

module.exports = route;