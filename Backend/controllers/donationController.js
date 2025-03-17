import asyncHandler from "express-async-handler";
import Donation from "../models/donationModel.js";

// @desc GET donations
// @route GET /api/donations
// @access private
const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find();
  res.status(200).json(donations);
});

// @desc POST donations
// @route POST /api/donations
// @access private
const setDonation = asyncHandler(async (req, res) => {

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    itemCatergory,
    itemQuantity,
    imageUpload,
    itemDescription,
    pickUpAddress,
    pickUpTime,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !itemCatergory ||
    !itemQuantity ||
    !imageUpload ||
    !itemDescription ||
    !pickUpAddress ||
    !pickUpTime
  ) {
    res.status(400);
    throw new Error("Please enter all required donation details");
  }

  const donation = await Donation.create({ ...req.body });

  res.status(201).json(donation);
});

// @desc PUT donations
// @route PUT /api/donations/:id
// @access private
const updateDonation = asyncHandler(async (req, res) => {

  const donation = await Donation.findById(req.params.id);

  if(!donation){
    res.status(400);
    throw new Error("Donation not found");
  }

  const updatedDonation = await Donation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(updatedDonation);
});

// @desc DELETE donations
// @route DELETE /api/donations/:id
// @access private
const deleteDonation = asyncHandler(async (req, res) => {

  const donation = await Donation.findById(req.params.id);

  if(!donation){
    res.status(400);
    throw new Error("Donation not found");
  }

  await donation.deleteOne();

  res
    .status(200)
    .json({id: req.params.id, message: "Donation removed"});
});

export { getDonations, setDonation, updateDonation, deleteDonation };
