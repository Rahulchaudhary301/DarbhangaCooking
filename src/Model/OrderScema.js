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


// Schema for raw data details
const TotalRawDataListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: String, required: true },
    belog: { type: String, required: true }, // E.g., "kirana"
});

// Schema for masala data details
const TotalMasalaDataListSchema = new mongoose.Schema({
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
    category: { type: [String]},
});




// Define the schema for an Utelsils
const TotalUtensilDataListSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    selectedQuntity:{ type: String, required: true },
    selecte:{ type: Boolean, default: false },
    
});



// Define the schema for an ExtraList
const TotalExtraDataListSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    selectedQuntity:{ type: String, required: true },
    selecte:{ type: Boolean, default: false },
    
});

const SelectedCookSchema = new mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    member:{ type: String, required: true },
    leader:{ type: String, required: true },
    experience:{ type: String, required: true },
    speciality:{ type: String, required: true },
    selecte:{ type: Boolean, default: false },
    
});




// Define the schema for an order item category (e.g., Rice, Vegetable)
const OrderCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true }, // E.g., "Rice", "Vegetable"
    items: { type: [ItemSchema], required: true }, // List of items in this category
});



// Define the main schema for the user order
const OrderSchema = new mongoose.Schema({
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
    TotalRawDataList: { type: [TotalRawDataListSchema], default: [] }, // Using raw data details schema
    TotalMasalaDataList: { type: [TotalMasalaDataListSchema], default: [] }, // Using masala data details schem
    TotalUtensilDataList: { type: [TotalUtensilDataListSchema], default: [] },
    TotalExtraDataList: { type: [TotalExtraDataListSchema], default: [] },
    SelectCookData: { type: [SelectedCookSchema], default: [] },
    ContractorIdd: { type: String },
    ContractorName: { type: String },
    ContractorMobile: { type: String  },
    ContractorAddress: { type: String  },
    ContractorSendTo: { type: Boolean, required: true },
    IsOrderAcceptByContractor:{ type: Boolean, default: false },
    IsContractorPrepaiedOrder:{ type: Boolean, default: false },
    IsContractorNeedForChange:{ type: Boolean, default: false },
    

    orderItem: { type: [OrderCategorySchema], required: true }, // List of categories and their items
}, { timestamps: true });

// Create the Mongoose model
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
