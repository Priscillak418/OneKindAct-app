import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";
import Donor from "../models/Donor.js";
import Volunteer from "../models/Volunteer.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


// @desc POST users
// @route POST /api/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, region, email, password, role, permissions } = req.body;

    if (!firstName || !lastName || !email || !password ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!["Admin", "Donor", "Volunteer"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }


    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;

    // Create user based on role
    if (role === "Admin") {
        if (!permissions) {
            return res.status(400).json({ message: "Admin must have permissions" });
        }
        user = new Admin({ firstName, lastName, email, password: hashedPassword, permissions });
    } else if (role === "Donor") {
        if (!region) {
            return res.status(400).json({ message: "Donor must have a region" });
        }
        user = new Donor({ firstName, lastName, email, password: hashedPassword, region });
    } else if (role === "Volunteer") {
        if (!region) {
            return res.status(400).json({ message: "Volunteer must have a region" });
        }
        user = new Volunteer({ firstName, lastName, email, password: hashedPassword, region });
    }

    // Save user
    await user.save();
    res.status(201).json({
        _id: user.id,
        token: generateToken(user._id),
    });


})


// @desc POST users
// @route POST /api/auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && ( await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
    
})

// @desc GET user details
// @route POST /api/auth/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email, role } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email,
        role
    });
})


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};


export { loginUser, registerUser, getMe };