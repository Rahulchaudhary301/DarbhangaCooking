const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({

  teamName: {
    type: String,
    required: true
  },

  leaderName: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  speciality: {
    type: String,
    required: true
  },

  contractorId: {
    type: String,
    required: true
  },

  isDeleted: {
    type: Boolean,
    default:false
  },

  profilePic: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema);