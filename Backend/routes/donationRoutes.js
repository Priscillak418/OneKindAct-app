import express from "express";
import {
  getDonations,
  setDonations,
  updateDonations,
  deleteDonations,
} from "../controllers/donationController.js";

const router = express.Router();

router.route("/").get(getDonations).post(setDonations);
router.route("/:id").put(updateDonations).delete(deleteDonations);


export default router;
