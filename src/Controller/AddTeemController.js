const Team = require("../Model/AddTeemSchema");
const cloudinary = require("../Cloudi");








const AddTeem = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image required"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "team_profiles"
        });

        const team = new Team({

            teamName: req.body.teamName,
            leaderName: req.body.leaderName,
            mobile: req.body.mobile,
            experience: req.body.experience,
            speciality: req.body.speciality,
            contractorId: req.body.contractorId,
            profilePic: result.secure_url

        });

        await team.save();

        res.json({
            success: true,
            message: "Team Added Successfully",
            data: team
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};





const getAllCookTeamById = async (req, res) => {
    try {
        const order = req.body;

        const orders = await Team.find({
            contractorId: order.ContractorId,
            isDeleted: false   // 👈 important filter
        }).sort({ createdAt: -1 });

        res.status(200).send({
            status: true,
            data: orders
        });

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        });
    }
};





const DeleteTeamByContractor = async (req, res) => {
    try {

        const { id } = req.body;

       // console.log(id)

        if (!id) {
            return res.status(400).send({
                status: false,
                msg: "Team ID is required"
            });
        }

        const updatedData = await Team.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true } // updated data return karega
        );

        if (!updatedData) {
            return res.status(404).send({
                status: false,
                msg: "Team member not found"
            });
        }

        res.status(200).send({
            status: true,
            msg: "Team member deleted (soft delete)",
            data: updatedData
        });

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        });
    }
};




module.exports = { AddTeem, getAllCookTeamById , DeleteTeamByContractor };