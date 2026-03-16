
const { default: mongoose } = require('mongoose');
const OrderListItemModel = require('../Model/OrederListForClientsModel')
const RiceModel =require('../Model/RiceModel')
const OrderModel = require('../Model/OrderScema')







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
        // console.log(savedOrder)

        res.status(201).send({
            status: true,
            message: "Order processed successfully",
            data: savedOrder,
        });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


























const getOrderListFromOwner = async (req, res) => {

    try {

        const { mobile, id } = req.body

        // console.log(mobile)

        const data = await OrderModel.find({ _id: id , mobile:mobile});

         // console.log(id, mobile , data)

        res.status(201).send({ status: true, data: data })
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}






const RiceUpdateData = async (req, res) => {
  try {
    const { mobile, id, itemId, RawDataList, MasalaDataList , ContractorId} = req.body;


  //  console.log(mobile, id, itemId , ContractorId)


    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        ContractorIdd: ContractorId,
        _id: id,
      },
      {
        $set: {
          "orderItem.$[cat].items.$[item].RawDataList": RawDataList || [],
          "orderItem.$[cat].items.$[item].MasalaDataList": MasalaDataList || []
        }
      },
      {
        new: true,
        arrayFilters: [
          { "cat.categoryName": "Rice" },
          { "item._id": itemId }
        ]
      }
    );


   // console.log(updatedOrder.orderItem[0].items[1])

    if (!updatedOrder) {
      return res.status(404).send({ msg: "Order not found" });
    }

    res.status(200).send({
      message: "Masala & Raw list saved successfully ✅",
      data: updatedOrder,
    });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};





const DallUpdateData = async (req, res) => {
  try {
    const { mobile, id, itemId, RawDataList, MasalaDataList } = req.body;

    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        mobile: mobile,
        _id: id,
      },
      {
        $set: {
          "orderItem.$[cat].items.$[item].RawDataList": RawDataList || [],
          "orderItem.$[cat].items.$[item].MasalaDataList": MasalaDataList || []
        }
      },
      {
        new: true,
        arrayFilters: [
          { "cat.categoryName": "Dall" },
          { "item._id": itemId }
        ]
      }
    );


   // console.log(updatedOrder.orderItem[0].items[1])

    if (!updatedOrder) {
      return res.status(404).send({ msg: "Order not found" });
    }

    res.status(200).send({
      message: "Masala & Raw list saved successfully ✅",
      data: updatedOrder,
    });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};








const VegetableUpdateData = async (req, res) => {
  try {
    const { mobile, id, itemId, RawDataList, MasalaDataList } = req.body;

    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        mobile: mobile,
        _id: id,
      },
      {
        $set: {
          "orderItem.$[cat].items.$[item].RawDataList": RawDataList || [],
          "orderItem.$[cat].items.$[item].MasalaDataList": MasalaDataList || []
        }
      },
      {
        new: true,
        arrayFilters: [
          { "cat.categoryName": "Vegetable" },
          { "item._id": itemId }
        ]
      }
    );


   // console.log(updatedOrder.orderItem[0].items[1])

    if (!updatedOrder) {
      return res.status(404).send({ msg: "Order not found" });
    }

    res.status(200).send({
      message: "Masala & Raw list saved successfully ✅",
      data: updatedOrder,
    });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};




const RotiUpdateData = async (req, res) => {
  try {
    const { mobile, id, itemId, RawDataList, MasalaDataList } = req.body;

    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        mobile: mobile,
        _id: id,
      },
      {
        $set: {
          "orderItem.$[cat].items.$[item].RawDataList": RawDataList || [],
          "orderItem.$[cat].items.$[item].MasalaDataList": MasalaDataList || []
        }
      },
      {
        new: true,
        arrayFilters: [
          { "cat.categoryName": "Roti" },
          { "item._id": itemId }
        ]
      }
    );


   // console.log(updatedOrder.orderItem[0].items[1])

    if (!updatedOrder) {
      return res.status(404).send({ msg: "Order not found" });
    }

    res.status(200).send({
      message: "Masala & Raw list saved successfully ✅",
      data: updatedOrder,
    });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};



















module.exports = { OrderListItem, getOrderListFromOwner , RiceUpdateData  , DallUpdateData , VegetableUpdateData , RotiUpdateData}