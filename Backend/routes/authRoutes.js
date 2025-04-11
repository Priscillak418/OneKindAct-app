import express from 'express';
import { loginUser, registerUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.route("/register").post(registerUser)

// Route for user login
router.route("/login").post(loginUser)

// Route for getting the current user's information
router.route("/me").get(protect, getMe)

export default router;