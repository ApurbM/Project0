const express = require('express');
const router = express.Router();
const studentModel = require('./student');

router.get('/student',async (req,res)=>{
    try{
        if(req.isAuthenticated())
        {
          const data = await studentModel.find();
        //   console.log(typeof data);
           res.json(data); 
        }
        else{
            res.send("please login first");
        }
    } 
    catch(err){
  console.error(err);
  res.status(500).send("failure to read");
    }    
})

router.post('/student',async (req,res)=>{
    try{
        const data = req.body;
        const value = new studentModel(data);
        await value.save();
        res.status(200).send(`${data.name} got a place in database!`);
    }
    catch(err){
        console.error(err);
        res.status(500).send("you failed"); 
    }
})

router.put('/student/:student_code', async (req,res)=>{
    try{
        const studentCode = parseInt(req.params.student_code);
        const value = req.body;
       const updatedValue =  await studentModel.findOneAndUpdate({student_code:studentCode},{$set:value},{new:true});
         if(!updatedValue){
             res.status(505).send("not found the given student code");
         }
         else{
         res.status(200).json(updatedValue);  
 
         }
 
    }
   catch(err){
        console.error(err);
        res.json({"message":err});
   }
 
 
 })
router.delete('/student/:student_code',async (req,res)=>{
     try{
         const studentCode = req.params.student_code;
         const result = await studentModel.deleteOne({student_code:studentCode});
         if(result.deletedCount === 0){
             res.status(505).send("failed to delete");
         }
         else{
             res.status(200).send("deleted succesfully");
         }
     }  
     catch(err){
   res.send(err);
     }
 })
 
module.exports = router;