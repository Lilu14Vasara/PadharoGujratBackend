// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import placeRoutes from "./routes/placeRoutes.js";

// // Load environment variables
// dotenv.config();


// connectDB();


// const app = express();

// // Middleware
// app.use(express.json()); // 
// app.use(cors()); // Enable Cross-Origin Resource Sharing


// app.use("/api/auth", authRoutes);
// app.use("/api/places", placeRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to Gujarat Travel Guide API");
// });

// // Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:3001",
    "https://padharo-gujrat.vercel.app",
    "https://padharo-gujrat-k0tnq43n4-vasara-lilus-projects.vercel.app",
    "https://padharo-gujrat-qqrajyqaj-vasara-lilus-projects.vercel.app",
    "https://padharo-gujrat-lv08w4dd6-vasara-lilus-projects.vercel.app"
  ];
  
  app.use(cors({
    origin: [
      "http://localhost:3001",
      "https://padharo-gujrat.vercel.app",
      "https://padharo-gujrat-lv08w4dd6-vasara-lilus-projects.vercel.app",
      "https://padharo-gujrat-8knekb67l-vasara-lilus-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));
  
  
  
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api", contactRoutes);


// MongoDB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

