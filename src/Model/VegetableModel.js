const mongoose = require('mongoose');

const Vegetable = new mongoose.Schema({
    img: {
        type: String, // Assuming PaneerButterMashala is a path or URL
        required: true,
    },
    optionButton: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    range: {
        type: [String], // Array of strings for ranges like "100-150"
        required: true,
    },
    selecte: {
        type: Boolean,
        default: false,
    },
    member: {
        type: String,
        default: "",
    },
    RawDataList: {
        type: [mongoose.Schema.Types.Mixed], // Array to hold raw data objects (if any structure)
        default: [],
    },
    MasalaDataList: {
        type: [mongoose.Schema.Types.Mixed], // Array to hold masala data objects
        default: [],
    },
    RawData: {
        type: [String], // Array of strings for raw data names
        default: [],
    },
    MashalaData: {
        type: [String], // Array of strings for masala data names
        default: [],
    },
    RawDataUnit: {
        type: [String], // Array of strings for raw data units
        default: [],
    },
    MashalaDataUnit: {
        type: [String], // Array of strings for masala data units
        default: [],
    },
    mobile: { type: String, required: true }, // Common field for mobile
});

const VegetableModel = mongoose.model('Vegetable', Vegetable);

module.exports = VegetableModel;
