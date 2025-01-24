const express= require("express")
const app= express()
const {config}=require('dotenv')
const route= require("../src/route/routes")
const {default:mongoose}= require("mongoose")
const multer=require("multer")


const cors=require('cors')

config({path:"../config/config.env"})





app.use(express.json())
app.use(cors())


mongoose.connect(`mongodb+srv://RahulChaudhary:${process.env.MONGO_DB}.mongodb.net/DarbhangaCooking?retryWrites=true&w=majority`,{
    useNewUrlParser: true
})
.then(()=> console.log("mongoDB is connected"))
.catch((err=> console.log(err)))


app.use("/",route)

app.listen(process.env.PORT || 5000, function(){
    console.log("express app is running on port" +(process.env.PORT || 5000))
})