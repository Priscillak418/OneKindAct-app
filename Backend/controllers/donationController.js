import asyncHandler from "express-async-handler";
import Donation from "../models/donationModel.js";
import Donor from "../models/Donor.js";
import mongoose from "mongoose";
import DonationCategory from "../models/DonationCategory.js";



// @desc GET donations
// @route GET /api/donations
// @access private
const getDonations = asyncHandler(async (req, res) => {
  //const donations = await Donation.find();
  const donations = await Donation.find({donor: req.user.id}).populate("donor");
  res.status(200).json(donations);
});


// @desc POST donations
// @route POST /api/donations
// @access private
const setDonation = asyncHandler(async (req, res) => {

  const {
    donationCategory,
    donationQuantity,
    imageUpload,
    donationDescription,
    pickUpAddress,
    pickUpTime,
    phoneNumber
  } = req.body;

  // Check if the user is authenticated
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }
  const donorId = req.user.id;

  // Check if category exists by name
  const category = await DonationCategory.findOne({ name: donationCategory });
  if (!category) {
    res.status(400);
    throw new Error("Category not found. Make sure to use a valid category name.");
  }

  // Check if donor exists
  const donor = await Donor.findById(donorId);

  // Log donorData to check the result of the query
  console.log("Donor found:", donor);
  if (!donor) {
      res.status(404);
      throw new Error("Donor not found");
  }

  if (
    !donationCategory ||
    !donationQuantity ||
    !imageUpload ||
    !donationDescription ||
    !pickUpAddress ||
    !pickUpTime ||
    !phoneNumber
  ) {
    res.status(400);
    throw new Error("Please enter all required donation details");
  }

  // Create new donation
  const donation = new Donation({
    donor: req.user.id, // Link to donor
    donationCategory: category._id,
    donationQuantity,
    imageUpload,
    donationDescription,
    pickUpAddress,
    pickUpTime,
    phoneNumber,
});

  // Save donation
  const savedDonation = await donation.save();

  // Push donation ID to donor's donations array
  donor.donations.push(savedDonation._id);
  await donor.save();

  res.status(201).json(donation);
});

// @desc PUT donations
// @route PUT /api/donations/:id
// @access private
const updateDonation = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const updateData = req.body;

  const donation = await Donation.findById(id);

  //console.log("Donation found in the update:", donation);
  

  if(!donation){
    res.status(400);
    throw new Error("Donation not found");
  }

  const user = await Donor.findById(req.user.id);

  //Check for user
  if(!user){
    res.status(400);
    throw new Error("User not found");
  }

  // Check if the logged-in user is the donor of the donation
  if (donation.donor.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this donation");
  }

  // Update the donation fields
  Object.assign(donation, updateData);
  const updatedDonation = await donation.save();

  res
    .status(200)
    .json(updatedDonation);
});

// @desc DELETE donations
// @route DELETE /api/donations/:id
// @access private
const deleteDonation = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const donation = await Donation.findById(id);

  if(!donation){
    res.status(400);
    throw new Error("Donation not found");
  }

  const user = await Donor.findById(req.user.id);

  //Check for user
  if(!user){
    res.status(400);
    throw new Error("User not found");
  }

  // Check if the logged-in user is the donor of the donation
  if (donation.donor.toString() !== user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this donation");
  }


  // Remove donation from the donor's donations array
  await Donor.updateOne({ _id: donation.donor }, { $pull: { donations: id } });

  await donation.deleteOne();

  res
    .status(200)
    .json({id: req.params.id, message: "Donation removed"});
});

export {getDonations, setDonation, updateDonation, deleteDonation };
