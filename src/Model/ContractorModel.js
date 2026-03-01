const mongoose=require('mongoose')

const Contractor= new mongoose.Schema({

 
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

       address:{
        type:String,
        trim:true
      },
      aadhar:{
        type:String,
        trim:true
      }, 
      
   
   

},{timestamps:true})


module.exports= mongoose.model('Contractor',Contractor)