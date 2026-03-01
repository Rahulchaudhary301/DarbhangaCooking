const ContractorModel = require('../Model/ContractorModel')
const jwt = require('jsonwebtoken')


const ContractorUserCrete = async (req, res) => {

    try {

        const user = req.body;
        const { name, mobile, password , address , aadhar } = user

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

        const {  mobile, password  } = data


        const IsMobile = await ContractorModel.findOne({ mobile: mobile })

        if (!IsMobile) return res.status(400).send({ status: false, msg: "This mobile number not exist on DataBase" })
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






module.exports = { ContractorUserCrete, ContractorUserLogin }