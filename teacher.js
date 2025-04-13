const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
     Name:{
        type:String,
        required:true
     },
     Subject:{
        type:String,
        required:true
     },
     Salary:{
         type:Number,
         required:true
     },
     email_ID:{
        type:String,
        required:true,
        unique:true
     }
})
const teacher = mongoose.model('teacherRecord',teacherSchema);
module.exports = teacher;