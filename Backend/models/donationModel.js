import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    itemCatergory:{
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
    }
})

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;