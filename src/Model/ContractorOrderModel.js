const mongoose = require("mongoose");





// Schema for raw data details
const RawDataListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: String, required: true },
    belog: { type: String, required: true }, // E.g., "kirana"
});

// Schema for masala data details
const MasalaDataListSchema = new mongoose.Schema({
    name: { type: String, required: true },
     quantity: { type: String, required: true },
    unit: { type: String, required: true },
    belog: { type: String, required: true }, // E.g., "kirana"
});




// Define the schema for an individual item
const ItemSchema = new mongoose.Schema({
    img: { type: String, required: true },
    optionButton: { type: Boolean, default: false },
    name: { type: String, required: true },
    range: { type: [String], required: true },
    selecte: { type: Boolean, default: false },
    member: { type: String, required: true },
   // RawDataList: { type: [String], default: [] },
   // MasalaDataList: { type: [String], default: [] },
    RawDataList: { type: [RawDataListSchema], default: [] }, // Using raw data details schema
    MasalaDataList: { type: [MasalaDataListSchema], default: [] }, // Using masala data details schema
    RawData: { type: [String], required: true },
    MashalaData: { type: [String], required: true },
    RawDataUnit: { type: [String], required: true },
    MashalaDataUnit: { type: [String], required: true },
});

// Define the schema for an order item category (e.g., Rice, Vegetable)
const OrderCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true }, // E.g., "Rice", "Vegetable"
    items: { type: [ItemSchema], required: true }, // List of items in this category
});



// Define the main schema for the user order
const ContractorOrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    clientRequest: { type: Boolean, required: true },
    requsetGrant: { type: Boolean, required: true },
    orderPrepaired:{ type: Boolean, required: true },
    orderItemList:{ type: Boolean, required: true },
    orderSumbit:{ type: Boolean, required: true },
    CancelOrderPermision:{ type: Boolean, required: true },
    AcceptOrder:{ type: Boolean, required: true },
    workFinished:{ type: Boolean, required: true },
    isDeleted:{ type: Boolean, required: true },
    RequestForUpdate: { type: String, required: true },
    SelectedLocation:{ type: String, required: true },
    SelectedTime: { type: String, required: true },
    OrderType: { type: String, required: true },
    ContractorId: { type: String, required: true },
    ContractorOrderStatus:{ type: Boolean, required: true },
    

    orderItem: { type: [OrderCategorySchema], required: true }, // List of categories and their items
}, { timestamps: true });

// Create the Mongoose model
const ContractorOrder = mongoose.model("ContractorOrder", ContractorOrderSchema);

module.exports = ContractorOrder;
