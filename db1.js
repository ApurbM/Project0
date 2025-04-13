const mongoose = require('mongoose');

const LocalUrl = process.env.MONGODB_LOCAL;
const GlobalHostUrl = process.env.MONGODB_LINK;
async function connectDB(){
try{
     await mongoose.connect(LocalUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true
         });
         console.log('DB is connected..');
    } 
    catch(err){
         console.error('error: ',err," that is error");
    }
}

module.exports = connectDB;