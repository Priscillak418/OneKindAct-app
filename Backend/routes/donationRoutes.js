import express from "express";
import {
  getSingleDonation,
  getDonations,
  setDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController.js";

const router = express.Router();

router.route("/").get(getDonations).post(setDonation);
router.route("/:id").get(getSingleDonation).put(updateDonation).delete(deleteDonation);


export default router;
