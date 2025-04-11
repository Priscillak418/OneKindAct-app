import mongoose from "mongoose";
import User from "./User.js";

const adminSchema = mongoose.Schema({
    permissions : {
        type: String,
        required: true,
        enum: ["Manage_users", "approve_donations", "delete_posts"],
    },
})

const Admin = User.discriminator("Admin", adminSchema);
export default Admin;


