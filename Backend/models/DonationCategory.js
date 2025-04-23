import mongoose from "mongoose";

const DonationCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a category name"],
    unique: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const DonationCategory = mongoose.model("DonationCategory ", DonationCategorySchema);
export default DonationCategory ;
