import express from "express";
import {
  getSingleDonor,
  getDonors,
  setDonor,
  updateDonor,
  deleteDonor,
} from "../controllers/donorController.js";

const router = express.Router();

router.route("/").get(getDonors).post(setDonor);
router.route("/:id").get(getSingleDonor).put(updateDonor).delete(deleteDonor);


export default router;
