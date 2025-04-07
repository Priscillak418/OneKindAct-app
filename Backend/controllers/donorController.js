import asyncHandler from "express-async-handler";
import Donation from "../models/donationModel.js";
import Donor from "../models/Donor.js";

// @desc GET donors
// @route GET /api/donors
// @access private
const getDonors = asyncHandler(async (req, res) => {
    const donors = await Donor.find().populate("donations");
    res.status(200).json(donors);
  });

// @desc GET single donor
// @route GET /api/donors/:id
// @access private
const getSingleDonor = asyncHandler(async (req, res) => {
    const donor = await Donor.findById(req.params.id).populate("donations");

    if (!donor) {
        res.status(404);
        throw new Error("Donor not found");
    }

    res.status(200).json(donor);

  });


// @desc CREATE new donor
// @route POST /api/donors
// @access private
const setDonor = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, region } = req.body;

    // Check if donor already exists
    const donorExists = await Donor.findOne({ email });

    if (donorExists) {
        res.status(400);
        throw new Error("Donor already exists");
    }

    // Create new donor
    const donor = new Donor({
        firstName,
        lastName,
        email,
        password, // You would probably hash the password in a real app
        region,
        donations: [], // New donor, no donations yet
    });

    // Save donor to the database
    const createdDonor = await donor.save();

    res.status(201).json(createdDonor);
});


// @desc UPDATE donor
// @route PUT /api/donors/:id
// @access private
const updateDonor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, region } = req.body;

    // Find the donor by ID
    const donor = await Donor.findById(id);

    if (!donor) {
        res.status(404);
        throw new Error("Donor not found");
    }

    // Update donor's information
    donor.firstName = firstName || donor.firstName;
    donor.lastName = lastName || donor.lastName;
    donor.email = email || donor.email;
    donor.password = password || donor.password;
    donor.region = region || donor.region;

    // Save the updated donor
    const updatedDonor = await donor.save();

    res.status(200).json(updatedDonor);
});


// @desc DELETE DONOR AND SOFT DELETE donation
// @route DELETE /api/donors/:id
// @access private
const deleteDonor = asyncHandler (async (req, res) => {
    const { id } = req.params;

    const donor = await Donor.findById(id);

    if(!donor) {
        res.status(404);
        throw new Error("Donor not found");
    }

    // Find all donations linked to this donor
    const donations = await Donation.find({ donor: id });

    if (donations.length > 0) {
        // Mark all donations as deleted
        await Donation.updateMany({ donor: id }, { deleted: true });
    }

    // Delete the donor from the database
    await Donor.findByIdAndDelete(id);

    res.status(200).json({ message: "Donor and their donations have been handled accordingly." });
});



export { getDonors, getSingleDonor, setDonor, updateDonor, deleteDonor };
