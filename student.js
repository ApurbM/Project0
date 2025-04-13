const mongoose = require('mongoose');

const student = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    class:{
        type:Number,
        required:true
    },
    Number:{
        type:Number,
        required:true
    },
    student_code:{
        type:Number,
        required:true,
        unique:true
    }
})
const modelStudent = mongoose.model('studentRecord',student); //it return a constructor
module.exports = modelStudent;