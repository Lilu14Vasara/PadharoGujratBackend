import express from "express";
import { addFavoritePlace, getFavoritePlaces, removeFavoritePlace } from "../controllers/favoriteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store files in "uploads/" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); //  Unique filenames
    }
});

const upload = multer({ storage: storage });


const router = express.Router();

// Add a favorite place (with image upload)
router.post("/", authMiddleware, upload.single("image"), addFavoritePlace);

// Get all favorite places
router.get("/", authMiddleware, getFavoritePlaces);

// Remove a favorite place
router.delete("/:placeId", authMiddleware, removeFavoritePlace);

export default router;
