const mongoose=require('mongoose')

const User= new mongoose.Schema({

 
      name:{
        type:String,
        trim:true
      },
      
      mobile:{
        type:String,
        trim:true
      },
      password:{
        type:String,
        trim:true
      }, 
   
   

},{timestamps:true})


module.exports= mongoose.model('User',User)