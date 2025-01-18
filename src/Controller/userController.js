const userModel=require('../Model/userModel')
const jwt =require('jsonwebtoken')


const userCrete=async(req,res)=>{

    try {
        
         const user=req.body;
         const { name,mobile, password}=user

        // if(!name && !email && !password && !mobile) return   res.status(400).send({ status: false, msg: "All field is require" })
         
         const isMobile= await userModel.findOne({mobile:mobile})
         if(isMobile) return   res.status(400).send({ status: false, msg: "this Mobile is already in Use" })

        const data =await userModel.create(user)
        res.status(201).send({ status: true, data: data })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}






const UserLogin= async(req,res)=>{
      
    try{
         const data=req.body;

         const { mobile,password}=data


        const IsMobile = await userModel.findOne({mobile:mobile})
       
        if(!IsMobile) return res.status(400).send({status:false,msg:"This mobile number not exist on DataBase"})
        if(IsMobile.password !== password) return res.status(400).send({status:false,msg:"Wrong PassWord"})

        const token=jwt.sign({userId: IsMobile._id},'Secret-Key')


        const userData = {
            name: IsMobile.name,
            mobile: IsMobile.mobile,
          };
        res.status(201).send({status:true, token:token ,userId:IsMobile._id ,data:userData} )

    }
 catch(err){
     res.status(500).send({status:false, msg:err.message})
 }



}








const getAllUser = async (req, res) => {
    try {
        // Fetch all users sorted by creation time in descending order
        const data = await userModel.find().sort({ createdAt: -1 }); // -1 for descending order
        res.status(201).send({ status: true, data: data });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};








const DeleteUserWithMobileNumber=async(req,res)=>{

    try {

        const { mobile } = req.body; // Extract mobile number from the request body

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }

        // Find and delete the user with the given mobile number
        const deletedUser = await userModel.findOneAndDelete({ mobile });

         res.status(201).send({ status: true,  msg: "User deleted successfully"})


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}










module.exports={UserLogin,userCrete , getAllUser , DeleteUserWithMobileNumber}