import express from "express";
import {
  getDonations,
  setDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController.js";

const router = express.Router();

router.route("/").get(getDonations).post(setDonation);
router.route("/:id").put(updateDonation).delete(deleteDonation);


export default router;
