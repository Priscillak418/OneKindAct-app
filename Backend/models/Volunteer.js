import mongoose from "mongoose";
import User from "./User.js";


const volunteerSchema = mongoose.Schema({
    region : {
        type: String,
        required: true,
    },
})

const Volunteer = User.discriminator("Volunteer", volunteerSchema);
export default Volunteer;