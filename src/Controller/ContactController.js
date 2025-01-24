const nodemailer = require("nodemailer");


const { config } = require('dotenv')

config({ path: "../config/config.env" })

const emailId = process.env.GMAIL_ID;
const password = process.env.PASSWORD;





const FormData = async (req, res) => {
    try {
        const {name, email , message} = req.body;
         
        
        const transporter = nodemailer.createTransport({
           // host: 'smtp.ethereal.email',
            service:"gmail",
            auth: {
                user: emailId,
                pass: password
            }
        });


        const recipients = ["rahulchaudhary301@gmail.com", "info.darbhangacatering@gmail.com" , "ramvilashcool612@gmail.com"]; 

        const info = await transporter.sendMail({
            from: emailId,
            to: recipients.join(','), 
            subject: "Darbhanga Catering ✔",
           // text: Text,
           html: `<b>Hello Sir/Ma'am , this is Clients message 
           <h3>Name : ${name}</h3>
           <h3>Email address : ${email}</h3>
           <h3>Message : ${message}</h3>
           </b>`,
        });


        const inf = await transporter.sendMail({
            from: "info.darbhangacatering@gmail.com",
            to: email,
            subject: "successfull submit Darbhanga Catering ✔",
           // text: Text,
           html: `<b>Hello Sir/Ma'am , ${name}
           <p> Thanks you sir/ma'am , your Darbhanga Catering form has been submitted successfully.. </p>
           <p> I will Contact You as soon as Possible... </p>
           </b>`,
        });


        res.status(201).send({ status: true, data: info.messageId });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports = { FormData }