
const OrderModel = require('../Model/OrderScema')


//const vegetableModel= require('../Model/VegetableModel')






const OrderData = async (req, res) => {
    try {
        const order = req.body;

        // Check if the mobile number exists in the request
        if (!order.mobile) {
            return res.status(400).send({
                status: false,
                message: "Mobile number is required to process the order"
            });
        }

        // Delete previous orders for the given mobile number
        // await OrderModel.deleteMany({ mobile: order.mobile });


        // Save the new order
        await OrderModel.create(order);

        res.status(201).send({ status: true, message: "Data fetch successfully", });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};







const OrderDataUpdateExtingId = async (req, res) => {
    try {
        const order = req.body; // New order data to update
        const { mobile, id } = req.query; // Query parameters

        // Validation: Ensure mobile and id are provided
        if (!mobile || !id) {
            return res.status(400).send({ status: false, message: "Mobile number and ID are required" });
        }

        // Validation: Ensure order data is not empty
        if (!order || Object.keys(order).length === 0) {
            return res.status(400).send({ status: false, message: "Order data is required to update" });
        }

       // console.log(mobile, id); // Debugging log
      //  console.log(order);      // Debugging log

        // Find and update the document
        const updatedOrder = await OrderModel.findOneAndUpdate(
            { mobile: mobile, _id: id }, // Filter by mobile and id
            { $set: order },             // Update the document with the new order data
            { new: true }                // Return the updated document
        );

        // If no matching document is found
        if (!updatedOrder) {
            return res.status(404).send({ status: false, message: "Order not found for the given mobile number and ID" });
        }

        res.status(201).send({ status: true, message: "Data Update successfully", });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


































const getAllOrder = async (req, res) => {

    try {
        const { mobile } = req.body

        // console.log(mobile)

       // const data = await OrderModel.find({ mobile: mobile })
         const data= await OrderModel.find().sort({ createdAt: -1 });
        res.status(201).send({ status: true, data: data })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}






const getAllOrderWithSameNumber = async (req, res) => {

    try {

        const { mobile } = req.body
        // console.log(mobile)

        const data = await OrderModel.find({ mobile: mobile })

      //  const data = await OrderModel.find().sort({ createdAt: -1 });
        res.status(201).send({ status: true, data: data })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}











const getOrderByNumber = async (req, res) => {

    try {

        const { mobile, id } = req.body

        // console.log(mobile)

        const data = await OrderModel.find({ mobile: mobile, _id: id });

          console.log(id ,data)

        res.status(201).send({ status: true, data: data })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




const requestForUpdateByNumber = async (req, res) => {

    try {

        const { mobile, id } = req.body;

        // Find and update the document
        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile, _id: id }, // Filter by mobile number and ID
            { $set: { clientRequest: true, RequestForUpdate: "Requested..." } }, // Update fields
            { new: true } // Return the updated document
        );

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}








const permissionGrant = async (req, res) => {
    try {
        const { mobile, id } = req.body;

        // Update the document with both fields in one $set object
        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile, _id: id },                // Filter by mobile number
            { $set: { clientRequest: false, requsetGrant: true, RequestForUpdate: "Permission Grant" } }, // Update both fields
            { new: true }                       // Return the updated document
        );

        // console.log("Permission granted");

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(200).send({ status: true, data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};



















const CheckPermission = async (req, res) => {

    try {

        const { mobile } = req.body;

        // Find and update the document with the provided mobile number
        const updatedData = await OrderModel.find({ mobile: mobile });

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}
















const requestForOderPreairedStatus = async (req, res) => {

    try {

        const { mobile , id } = req.body;

        //  console.log('rahulllllllllllllllllll' , mobile)

        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile , _id:id },
            { $set: { orderPrepaired: true, orderItemList: true } },

            { new: true }
        );

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}








const CancelOrderSumited = async (req, res) => {

    try {

        const { mobile } = req.body;



        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile },
            { $set: { orderSumbit: false } },

            { new: true }
        );

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}










const PermissionForCancelOrber = async (req, res) => {

    try {

        const { mobile , id} = req.body;



        //console.log(mobile , id)

        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile , _id:id},
            { $set: { CancelOrderPermision: true } },

            { new: true }
        );




        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}











const PermissionNewOrder = async (req, res) => {

    try {

        const { mobile } = req.body;



        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile },
            { $set: { workFinished: true } },

            { new: true }
        );

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




























const NotAcceptOrderRequest = async (req, res) => {

    try {

        const { mobile } = req.body;

        // Validate input
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }

        // Update all matching documents
        const updateResult = await OrderModel.updateMany(
            { mobile: mobile }, // Filter by mobile number
            { $set: { AcceptOrder: true, requestGrant: true } } // Update fields
        );

        // Check if any documents were updated
        if (updateResult.matchedCount === 0) {
            return res.status(404).send({ status: false, msg: "No orders found for the given mobile number" });
        }


        
        res.status(201).send({ status: true, msg: "Cancel order sent successfully" })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}













const requestForOderPreairedStatusFalse = async (req, res) => {

    try {

        const { mobile , id } = req.body;

        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile ,_id:id },              // Filter by mobile number
            { $set: { orderPrepaired: false , orderItemList:false } }, // Update the clientRequest key to true
            { new: true }                    // Return the updated document
        );


       // console.log(id , updatedData)

        if (!updatedData) {
            return res.status(404).send({ status: false, msg: "Data not found for the given mobile number" });
        }

        res.status(201).send({ status: true, data: updatedData })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}





const DeleteOrderWithMobileNumber = async (req, res) => {

    try {

        const { mobile } = req.body; // Extract mobile number from the request body

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }

        // Find and delete the user with the given mobile number
        const deletedUser = await OrderModel.findOneAndDelete({ mobile });

        res.status(201).send({ status: true, msg: "User deleted successfully" })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}










const DeleteOrderWithMobileNumberAndId = async (req, res) => {

    try {

        const { mobile , id} = req.body; // Extract mobile number from the request body

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }

        // Find and delete the user with the given mobile number
        const deletedUser = await OrderModel.findOneAndDelete({ mobile , _id:id});

        res.status(201).send({ status: true, msg: "User deleted successfully" })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




























module.exports = {
    OrderData, getAllOrder, getOrderByNumber, requestForUpdateByNumber, CheckPermission, OrderDataUpdateExtingId, DeleteOrderWithMobileNumberAndId,

    permissionGrant, requestForOderPreairedStatus, PermissionNewOrder, requestForOderPreairedStatusFalse, getAllOrderWithSameNumber, CancelOrderSumited, PermissionForCancelOrber, NotAcceptOrderRequest, DeleteOrderWithMobileNumber
}