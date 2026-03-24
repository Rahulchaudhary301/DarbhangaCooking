const userModel = require('../Model/userModel')
const riceModel = require('../Model/RiceModel')
const vegetableModel = require('../Model/VegetableModel')
const rotiModel = require('../Model/RotiModel')
const dallModel = require('../Model/DallModel')

const SaladModel = require('../Model/SaladModel')
const RaitaModel = require('../Model/RaitaModel')
const SweetsModel = require('../Model/SweetsModel')
const PakordaModel = require('../Model/PakordaModel')

const NonVegModel = require('../Model/NonVegModel')
const PapadChipsModel = require('../Model/PapadChipsModel')
const ChutneyPickleModel = require('../Model/ChutneyPickle')
const IceCreamModel = require('../Model/IceCreamModem')

const ColdDrinksModel = require('../Model/Colddrinks')
const HotDrinksModel = require('../Model/HotDrinksModel')
const IndianStaterModel = require('../Model/IndianstatrerModel')
const ChainesstaterModel = require('../Model/ChinesstaterModel')


const OrderModel = require('../Model/OrderScema')
const ChinesStaterModel = require('../Model/ChinesstaterModel')

//const vegetableModel= require('../Model/VegetableModel')


const RiceData = async (req, res) => {
    try {
        // const { RiceData, VegetableData, RotiData, DaalData } = req.body; // Incoming array of objects

        const { SelectedRice, SelectedVegetable, SelectedRoti, SelectedDall ,
                                                       SelectedBachaka , SelectedNonVeg , SelectedSweets ,
                                                       SelectedChinesStatrter  , SelectedIndianStatrter ,
                                                       SelectedColdDrink , SelectedHotDrinks  , SelectedIceCream ,
                                                       SelectedChutneyPickle , SelectedPapadChips , SelectedSalad ,SelectedRaita
               } = req.body;

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


         const BachakaWithMobile = SelectedBachaka.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


        const NonVegWithMobile = SelectedNonVeg.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const SweetsWithMobile = SelectedSweets.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const ChinesStatrterWithMobile = SelectedChinesStatrter.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


         const IndianStatrterWithMobile = SelectedIndianStatrter.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


        const ColdDrinkWithMobile = SelectedColdDrink.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const HotDrinksWithMobile = SelectedHotDrinks.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const IceCreamWithMobile = SelectedIceCream.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


          const ChutneyPickleWithMobile = SelectedChutneyPickle.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });


        const PapadChipsWithMobile = SelectedPapadChips.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const SaladWithMobile = SelectedSalad.map(item => {
            const { _id, ...rest } = item;  // Remove _id if it exists
            return { ...rest, mobile };
        });

        const RaitaWithMobile = SelectedRaita.map(item => {
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

        await SaladModel.deleteMany({ mobile });
        await RaitaModel.deleteMany({ mobile });
        await SweetsModel.deleteMany({ mobile });
        await PakordaModel.deleteMany({ mobile });
        await NonVegModel.deleteMany({ mobile });
        await PapadChipsModel.deleteMany({ mobile });
        await ChutneyPickleModel.deleteMany({ mobile });
        await IceCreamModel.deleteMany({ mobile });
        await ColdDrinksModel.deleteMany({ mobile });
        await HotDrinksModel.deleteMany({ mobile });
        await IndianStaterModel.deleteMany({ mobile });
        await ChinesStaterModel.deleteMany({ mobile });

       

        // Step 2: Insert new data
        await riceModel.insertMany(RiceWithMobile);
        await dallModel.insertMany(DallWithMobile);
        await vegetableModel.insertMany(VegetableWithMobile);
        await rotiModel.insertMany(RotiWithMobile);
        await SaladModel.insertMany(SaladWithMobile);
        await RaitaModel.insertMany(RaitaWithMobile);
        await SweetsModel.insertMany(SweetsWithMobile);
        await PakordaModel.insertMany(BachakaWithMobile);
        await NonVegModel.insertMany(NonVegWithMobile);
        await PapadChipsModel.insertMany(PapadChipsWithMobile);
        await ChutneyPickleModel.insertMany(ChutneyPickleWithMobile);
        await IceCreamModel.insertMany(IceCreamWithMobile);
        await ColdDrinksModel.insertMany(ColdDrinkWithMobile);
        await HotDrinksModel.insertMany(HotDrinksWithMobile);
        await IndianStaterModel.insertMany(IndianStatrterWithMobile);
        await ChinesStaterModel.insertMany(ChinesStatrterWithMobile);



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

        const salad = await SaladModel.find({ mobile: mobile });
        const raita = await RaitaModel.find({ mobile: mobile });
        const sweets = await SweetsModel.find({ mobile: mobile });
        const pakorda = await PakordaModel.find({ mobile: mobile });

        const nonVej = await NonVegModel.find({ mobile: mobile });
        const papadChips = await PapadChipsModel.find({ mobile: mobile });
        const chutneyPickle = await ChutneyPickleModel.find({ mobile: mobile });
        const icecReam = await IceCreamModel.find({ mobile: mobile });

        const coldDrinks = await ColdDrinksModel.find({ mobile: mobile });
        const hotDrinks = await HotDrinksModel.find({ mobile: mobile });
        const indianStater = await IndianStaterModel.find({ mobile: mobile });
        const chinesStater = await ChinesStaterModel.find({ mobile: mobile });

       // const order = await OrderModel.find({ mobile: mobile })
       
       

        res.status(201).send({ status: true, message: "Data fetch successfully" , rice: rice, vegetable: vegetable, roti: roti, dall: dall ,
                              salad:salad , raita:raita,  sweets:sweets, pakorda:pakorda, nonVej:nonVej, papadChips:papadChips, chutneyPickle:chutneyPickle,          
                                      icecReam:icecReam, coldDrinks:coldDrinks, hotDrinks:hotDrinks, indianStater:indianStater, chinesStater:chinesStater,

         });
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