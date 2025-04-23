import asyncHandler from 'express-async-handler';
import DonationCategory from '../models/DonationCategory.js';

// @desc GET donation categories
// @route GET /api/donationCategories
// @access public
const getDonationCategories = asyncHandler(async (req, res) => {
    const donationCategories = await DonationCategory.find();
    res.status(200).json(donationCategories);
});

// @desc POST donation category
// @route POST /api/donationCategories
// @access private (admin only)
const setDonationCategory = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a category name');
    }

    const donationCategory = await DonationCategory.create({
        name: req.body.name,
    });

    res.status(201).json(donationCategory);
});

export { getDonationCategories, setDonationCategory };