// import jwt from "jsonwebtoken";

//  const validateSignup = (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Please provide all required fields." });
//   }
//   next();
// };

//  const validateLogin = (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Please provide both email and password." });
//   }
//   next();
// };

//  const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ message: "Access denied. No valid token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// export { verifyToken, validateLogin, validateSignup };

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/User.js"; // User Model Import Karo

// dotenv.config();

// // Authentication Middleware (Protect Routes)
// export const authMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied: No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decoded); // Debugging

//         // Token decode hone ke baad actual user fetch karo
//         const user = await User.findById(decoded.userId).select("-password");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user; // Pura user attach karo (id bhi milega)
//         console.log("User Set in req.user:", req.user); // Debugging
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: "Invalid or expired token" });
//     }
// };


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Authentication Middleware (Protect Routes)
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer Token

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Validate Signup Request
export const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
    next();
};

// Validate Login Request
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    next();
};
