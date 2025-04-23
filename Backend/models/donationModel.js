import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor", // Reference to the Donor model
        required: true
    },
    donationCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonationCategory",
        required: true,
    },
    donationQuantity:{
        type: Number,
        required: true,
    },
    imageUpload:{
        type: String,
        required: true,
    },
    donationDescription:{
        type: String,
        required: true,
    },
    pickUpAddress:{
        type: String,
        required: true,
    },
    pickUpTime:{
        type: Date,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
})

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;