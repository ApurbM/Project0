const mongoose =  require('mongoose');

const SchemaLogin = mongoose.Schema({ 
  username:{
    type:String,
    unique:true
  },
  // LoginType:{
  //   type:String,
  //   enum:['Admin','Student'],
  //   default:'Student'
  // },
  password:{
    type:String
  }
})

const userInfo = mongoose.model('LoginInfo',SchemaLogin);
module.exports = userInfo;