import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor", // Reference to the Donor model
        required: true
    },
    itemCategory:{
        type: String,
        required: true,
    },
    itemQuantity:{
        type: Number,
        required: true,
    },
    imageUpload:{
        type: String,
        required: true,
    },
    itemDescription:{
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