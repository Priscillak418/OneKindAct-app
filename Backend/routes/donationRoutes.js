import express from "express";
import {
  getDonations,
  setDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getDonations).post(protect, setDonation);
router.route("/:id").put(protect, updateDonation).delete(protect, deleteDonation);


export default router;
