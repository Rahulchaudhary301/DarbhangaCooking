const RiceModel =require('../Model/RiceModel')
const RotiModel =require('../Model/RotiModel')
const VegetableModel =require('../Model/VegetableModel')
const DallModel =require('../Model/DallModel')
const OrderModel = require('../Model/OrderScema')








const DeleteAll = async (req, res) => {
    try {
        const { mobile } = req.query;

  if (!mobile) {
    return res.status(400).json({ msg: "Mobile number is required" });
  }

      await OrderModel.deleteMany({ mobile });
      await RiceModel.deleteMany({ mobile });
      await RotiModel.deleteMany({ mobile });
      await DallModel.deleteMany({ mobile });
      await VegetableModel.deleteMany({ mobile });



        res.status(201).send({ status: true, message: "Empty card Succeesfully",});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};








module.exports={DeleteAll}