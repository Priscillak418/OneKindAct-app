import mongoose from "mongoose";
import User from "./User.js";

const donorSchema = mongoose.Schema({
    region : {
        type: String,
        required: true,
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation" // Reference to the Donation model
    }]
})

const Donor = User.discriminator("Donor", donorSchema);
export default Donor;