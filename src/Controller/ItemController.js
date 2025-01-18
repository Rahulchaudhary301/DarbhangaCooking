const userModel = require('../Model/userModel')
const riceModel = require('../Model/RiceModel')
const vegetableModel = require('../Model/VegetableModel')
const rotiModel = require('../Model/RotiModel')
const dallModel = require('../Model/DallModel')

const OrderModel = require('../Model/OrderScema')

//const vegetableModel= require('../Model/VegetableModel')


const RiceData = async (req, res) => {
    try {
        // const { RiceData, VegetableData, RotiData, DaalData } = req.body; // Incoming array of objects

        const { SelectedRice, SelectedVegetable, SelectedRoti, SelectedDall } = req.body;

        const { mobile } = req.query; // Assuming mobile number is sent as a query parameter

        if (!mobile) {
            return res.status(400).send({ status: false, message: "Mobile number is required" });
        }





        // Add the mobile key to each document, and remove the _id field to avoid duplicates
        const RiceWithMobile = SelectedRice.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


        const DallWithMobile = SelectedDall.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const VegetableWithMobile = SelectedVegetable.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const RotiWithMobile = SelectedRoti.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        // Log DaalData for debugging
        // console.log("DaalData with Mobile:", DallWithMobile);

        // Step 1: Delete all data for the given mobile number
        await riceModel.deleteMany({ mobile });
        await vegetableModel.deleteMany({ mobile });
        await rotiModel.deleteMany({ mobile });
        await dallModel.deleteMany({ mobile });

        // Step 2: Insert new data
        await riceModel.insertMany(RiceWithMobile);
        await dallModel.insertMany(DallWithMobile);
        await vegetableModel.insertMany(VegetableWithMobile);
        await rotiModel.insertMany(RotiWithMobile);

        res.status(201).send({ status: true, message: "Data replaced successfully" });
    } catch (err) {
        console.error("Error in inserting data:", err);
        res.status(500).send({ status: false, message: err.message });
    }
};














const AllRiceData = async (req, res) => {
    try {
        const { mobile } = req.query;


        if (!mobile) {
            return res.status(400).send({ status: false, message: "mobile number is required" });
        }

        const rice = await riceModel.find({ mobile: mobile });
        const vegetable = await vegetableModel.find({ mobile: mobile });
        const roti = await rotiModel.find({ mobile: mobile });
        const dall = await dallModel.find({ mobile: mobile });

       // const order = await OrderModel.find({ mobile: mobile })
       
       

        res.status(201).send({ status: true, message: "Data fetch successfully" , rice: rice, vegetable: vegetable, roti: roti, dall: dall });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};








const AllDataDelete = async (req, res) => {
    try {
        const { mobile } = req.query;


        if (!mobile) {
            return res.status(400).send({ status: false, message: "mobile number is required" });
        }

        // Step 1: Delete all data for the given mobile number
        await riceModel.deleteMany({ mobile });
        await vegetableModel.deleteMany({ mobile });
        await rotiModel.deleteMany({ mobile });
        await dallModel.deleteMany({ mobile });


        res.status(201).send({ status: true, message: "Delete data successfully"});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};





















// const UserLogin= async(req,res)=>{

//     try{
//          const data=req.body;

//          const { mobile,password}=data


//         const IsMobile = await userModel.findOne({mobile:mobile})

//         if(!IsMobile) return res.status(400).send({status:false,msg:"This mobile number not exist on DataBase"})
//         if(IsMobile.password !== password) return res.status(400).send({status:false,msg:"Wrong PassWord"})

//         const token=jwt.sign({userId: IsMobile._id},'Secret-Key')


//         const userData = {
//             name: IsMobile.name,
//             mobile: IsMobile.mobile,
//           };
//         res.status(201).send({status:true, token:token ,userId:IsMobile._id ,data:userData} )

//     }
//  catch(err){
//      res.status(500).send({status:false, msg:err.message})
//  }



// }




module.exports = { RiceData, AllRiceData , AllDataDelete }