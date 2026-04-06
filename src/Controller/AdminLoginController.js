const AdminModel=require('../Model/AdminLoginModel')
const jwt =require('jsonwebtoken')


const AdminCrete=async(req,res)=>{

    try {
        
         const user=req.body;
         const { username, password}=user

      
         
         const isName= await AdminModel.findOne({username:username})
         if(isName) return   res.status(400).send({ status: false, message: "this user is already in Use" })

        const data =await AdminModel.create(user)
        res.status(201).send({ status: true, data: data })


    }

    catch (err) {

        res.status(500).send({ status: false, message: err.message })

    }

}






const AdminLogin = async(req,res)=>{
      
    try{
         const data=req.body;

         const { userId,password}=data


        const IsMobile = await AdminModel.findOne({_id:userId})
       
        if(!IsMobile) return res.status(400).send({status:false,message:"OOPs sorry You are Not Real Admin"})
        if(IsMobile.password !== password) return res.status(400).send({status:false,message:"Wrong PassWord"})

        const token=jwt.sign({userId: IsMobile._id},'Secret-Key')

        const user = {
            username: IsMobile.username,
            password: IsMobile.password,
            id:IsMobile._id
          };
        res.status(201).send({status:true, token:token ,userId:IsMobile._id ,data:user} )

    }
 catch(err){
     res.status(500).send({status:false, message:err.message})
 }



}








// const getAllUser = async (req, res) => {
//     try {
//         // Fetch all users sorted by creation time in descending order
//         const data = await userModel.find().sort({ createdAt: -1 }); // -1 for descending order
//         res.status(201).send({ status: true, data: data });
//     } catch (err) {
//         res.status(500).send({ status: false, msg: err.message });
//     }
// };








// const DeleteUserWithMobileNumber=async(req,res)=>{

//     try {

//         const { mobile } = req.body; // Extract mobile number from the request body

//         if (!mobile) {
//             return res.status(400).send({ status: false, msg: "Mobile number is required" });
//         }

//         // Find and delete the user with the given mobile number
//         const deletedUser = await userModel.findOneAndDelete({ mobile });

//          res.status(201).send({ status: true,  msg: "User deleted successfully"})


//     }

//     catch (err) {

//         res.status(500).send({ status: false, msg: err.message })

//     }

// }







module.exports={AdminLogin , AdminCrete}