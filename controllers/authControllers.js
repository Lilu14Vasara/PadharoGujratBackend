import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
 
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

// User Logout
export const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logged out successfully." });
};


// User Logout

  

//   const logoutUser = asyncHandler(async(req, res) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: {
//                 refreshToken: 1 // this removes the field from document $set:{refreshtoken:undefiend} //empty refresh token
//             }//return res.status(200).clearCookies("acesstoken",option).clearCookies("refreshtoken",option),,,(req,_) use _ instead of res when res is not use
//         },
//         {
//             new: true
//         }
//     )

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"))
// })





// {
//   "name": "John Doe",
//   "email": "johndoe@example.com",
//   "password": "123456"
// }
