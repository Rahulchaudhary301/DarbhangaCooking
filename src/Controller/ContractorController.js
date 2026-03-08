const ContractorModel = require('../Model/ContractorModel')
const ContractorOrderModel = require('../Model/ContractorOrderModel')
const OrderModel = require('../Model/OrderScema')
const jwt = require('jsonwebtoken')


const ContractorUserCrete = async (req, res) => {

    try {

        const user = req.body;
        const { name, mobile, password, address, aadhar } = user

        // if(!name && !email && !password && !mobile) return   res.status(400).send({ status: false, msg: "All field is require" })

        const isMobile = await ContractorModel.findOne({ mobile: mobile })
        if (isMobile) return res.status(400).send({ status: false, msg: "this Mobile is already in Use" })

        const isAadhar = await ContractorModel.findOne({ aadhar: aadhar })
        if (isAadhar) return res.status(400).send({ status: false, msg: "this Aadhar is already in Use" })

        const data = await ContractorModel.create(user)
        res.status(201).send({ status: true, data: data })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}






const ContractorUserLogin = async (req, res) => {

    try {
        const data = req.body;

        const { password, id } = data


        const IsMobile = await ContractorModel.findOne({ _id: id })

        if (!IsMobile) return res.status(400).send({ status: false, msg: "This Contractor Id is not Valid" })
        if (IsMobile.password !== password) return res.status(400).send({ status: false, msg: "Wrong PassWord" })

        const token = jwt.sign({ userId: IsMobile._id }, 'Secret-Key')


        const ContractorData = {
            name: IsMobile.name,
            mobile: IsMobile.mobile,
            address: IsMobile.address,
            aadhar: IsMobile.aadhar,
            userId: IsMobile._id

        };
        res.status(201).send({ status: true, token: token, userId: IsMobile._id, data: ContractorData })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }



}





const getAllContractor = async (req, res) => {
    try {
        // Fetch all users sorted by creation time in descending order
        const data = await ContractorModel.find().sort({ createdAt: -1 }); // -1 for descending order
        res.status(200).send({ status: true, data: data });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};










const ContractorOrderData = async (req, res) => {
    try {
        const order = req.body;

        if (!order) {
            return res.status(400).send({
                status: false,
                message: "Order must Required"
            });
        }

        //  // Find and update the document
        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: order.data.mobile, _id: order.data._id }, // Filter by mobile number and ID
            {
                $set: {
                    ContractorSendTo: true, ContractorName: order.data.ContractorName,
                    ContractorMobile: order.data.ContractorMobile, ContractorIdd: order.data.ContractorIdd,
                    ContractorAddress: order.data.ContractorAddress
                }
            }, // Update fields
            { new: true }
        );

        // Save the new order
        await ContractorOrderModel.create(order.data);

        res.status(201).send({ status: true, message: "Order Send Contractor successfully", });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};






const CancelContractorOrder = async (req, res) => {
    try {
        const order = req.body;

        if (!order) {
            return res.status(400).send({
                status: false,
                message: "Order must Required"
            });
        }

        //console.log(order)

        // Find and update the document
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: order.ContractorIdd }, // Filter by mobile number and ID
            {
                $set: {
                    ContractorSendTo: false, ContractorName: "",
                    ContractorMobile: "", ContractorIdd: "", ContractorAddress: ""
                }
            }, // Update fields
            { new: true }
        );


        await ContractorOrderModel.findOneAndDelete({ _id: order._id, ContractorId: order.ContractorIdd });

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully", });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};








const getAllContractorById = async (req, res) => {
    try {
        const order = req.body;

        const orders = await OrderModel.find({
            ContractorIdd: { $exists: true, $eq: String(order.ContractorIdd) },
            ContractorMobile: { $exists: true, $eq: String(order.mobile) }}).sort({ createdAt: -1 });

         // console.log(orders)

        res.status(201).send({ status: true, data: orders });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};







const SaveAndUpdateAllLists = async (req, res) => {
    try {
       
        const data = req.body;

        const {  mobile,id,ContractorId ,  RawData, MasalaData} = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    TotalRawDataList: RawData,
                    TotalMasalaDataList: MasalaData,
                }
            }, // Update fields
            { new: true }
        );


        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully",data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



const SaveAndUpdateUtensilData = async (req, res) => {
    try {
       
        const data = req.body;

        const {  mobile,id,ContractorId , UtensilsData} = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    TotalUtensilDataList: UtensilsData,
                }
            }, // Update fields
            { new: true }
        );


        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully",data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


const SaveAndUpdateExtraData = async (req, res) => {
    try {
       
        const data = req.body;

        const {  mobile,id,ContractorId , ExtraData} = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    TotalExtraDataList: ExtraData,
                }
            }, // Update fields
            { new: true }
        );


        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully",data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};




const SaveAndUpdateCookData = async (req, res) => {
    try {
       
        const data = req.body;

        const {  mobile,id,ContractorId , CookData} = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    SelectCookData: CookData,
                }
            }, // Update fields
            { new: true }
        );


        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully",data: updatedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};






const OrderSendToAdminByContractor = async (req, res) => {
    try {
       
        const data = req.body;

      

        const {  mobile,id,ContractorId } = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    
                    IsContractorPrepaiedOrder:true,
                }
            }, // Update fields
            { new: true }
        );

        // console.log(updatedData.IsContractorPrepaiedOrder)

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully"});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};





const OrderAcceptByContractor = async (req, res) => {
    try {
       
        const data = req.body;

      

        const {  mobile,id,ContractorId } = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    
                    IsOrderAcceptByContractor:true,
                }
            }, // Update fields
            { new: true }
        );

        // console.log(updatedData.IsContractorPrepaiedOrder)

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully"});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



const RequstForChangeByContractor = async (req, res) => {
    try {
       
        const data = req.body;

      

        const {  mobile,id,ContractorId } = data

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { ContractorIdd: ContractorId , _id:id  },
            {
                $set: {
                    
                    IsContractorNeedForChange:true,
                }
            }, // Update fields
            { new: true }
        );

        // console.log(updatedData.IsContractorPrepaiedOrder)

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully"});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};




const AcceptRequstForChangeByContractor = async (req, res) => {
    try {
       
        const data = req.body;

      

        const {  mobile,id,ContractorId } = data

       // console.log(id , mobile)

        
        const updatedData = await OrderModel.findOneAndUpdate(
            { mobile: mobile , _id:id  },
            {
                $set: {
                    
                    IsContractorNeedForChange:false,
                     IsContractorPrepaiedOrder:false,
                }
            }, // Update fields
            { new: true }
        );

        // console.log(updatedData.IsContractorPrepaiedOrder)

        res.status(201).send({ status: true, message: "Cancel Contrator Order successfully"});
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
























module.exports = { ContractorUserCrete, ContractorUserLogin, getAllContractor,SaveAndUpdateAllLists , SaveAndUpdateUtensilData , SaveAndUpdateExtraData,SaveAndUpdateCookData,
   OrderSendToAdminByContractor , AcceptRequstForChangeByContractor , ContractorOrderData, CancelContractorOrder, getAllContractorById , RequstForChangeByContractor, OrderAcceptByContractor}