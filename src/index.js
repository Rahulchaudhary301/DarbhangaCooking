const express= require("express")
const route= require("../src/route/routes")
const {default:mongoose}= require("mongoose")
const multer=require("multer")
const cors = require('cors')

const app= express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/DarbhangaCooking?retryWrites=true&w=majority",{
    useNewUrlParser: true
})
.then(()=> console.log("mongoDB is connected"))
.catch((err=> console.log(err)))


app.use("/",route)

app.listen(process.env.PORT || 5000, function(){
    console.log("express app is running on port" +(process.env.PORT || 5000))
})