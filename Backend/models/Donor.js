import mongoose from "mongoose";
import User from "./User.js";

const donorSchema = mongoose.Schema({
    region : {
        type: String,
        required: true,
    },
})

const Donor = User.discriminator("Donor", donorSchema);
export default Donor;