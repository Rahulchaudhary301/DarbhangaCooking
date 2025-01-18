
const { default: mongoose } = require('mongoose');
const OrderListItemModel =require('../Model/OrederListForClientsModel')







const OrderListItem = async (req, res) => {
    try {
        const order = req.body; // New order data
        const { id, mobile } = req.query; // Query parameters

        // Validate mobile number and id
        if (!mobile) {
            return res.status(400).send({
                status: false,
                msg: "Mobile number is required to process the order",
            });
        }

        if (!id) {
            return res.status(400).send({
                status: false,
                msg: "ID is required in the query parameters",
            });
        }

        // Add the `id` from the query to the order object
        order.id = new mongoose.Types.ObjectId(id);

        // Log the incoming order
      //  console.log(order);

        // Delete any existing orders with the same mobile and id
        await OrderListItemModel.deleteMany({ mobile: mobile, id: id });

        // Save the new order
        const savedOrder = await OrderListItemModel.create(order);

        res.status(201).send({
            status: true,
            message: "Order processed successfully",
            data: savedOrder,
        });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


























const getOrderListFromOwner=async(req,res)=>{

    try {

        const {mobile , id} = req.body

       // console.log(mobile)
        
       const data = await OrderListItemModel.find({id:id});

       //  console.log(id, data)

         res.status(201).send({ status: true, data: data })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}





module.exports={OrderListItem , getOrderListFromOwner}