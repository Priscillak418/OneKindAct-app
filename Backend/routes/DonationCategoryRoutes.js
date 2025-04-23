import express from 'express';
import {
    getDonationCategories,
    setDonationCategory,
} from '../controllers/donationCategoryController.js';


const router = express.Router();

router.route('/').get(getDonationCategories).post(setDonationCategory);

export default router;