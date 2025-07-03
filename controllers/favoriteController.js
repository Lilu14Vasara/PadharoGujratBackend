import Favorite from "../models/Favorite.js";
import multer from "multer";
import path from "path";

// Multer storage setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Add a Favorite Place (with Image Upload)
export const addFavoritePlace = async (req, res) => {
  try {
      console.log("Received Request Body:", req.body);
      console.log("Received File:", req.file);

      const { name, description } = req.body; //  Name field read ho raha hai
      const userId = req.user.userId; 

      if (!name || !description) {
          return res.status(400).json({ message: "Name and description are required." });
      }

      if (!req.file) {
          return res.status(400).json({ message: "Image upload required" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const favorite = new Favorite({ name, image: imageUrl, description, user: userId });
      await favorite.save();

      res.status(201).json(favorite);
  } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Error adding favorite place" });
  }
};


// Get User's Favorite Places
export const getFavoritePlaces = async (req, res) => {
  try {
      const userId = req.user.userId; // Ensure token contains userId
      console.log("Fetching favorites for user:", userId);

      const favorites = await Favorite.find({ user: userId });

      if (!favorites.length) {
          return res.status(200).json([]);
      }

      res.json(favorites);
  } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Error fetching favorites" });
  }
};


// Remove a Favorite Place
export const removeFavoritePlace = async (req, res) => {
    try {
        const { placeId } = req.params;
        const userId = req.user.userId;

        const favorite = await Favorite.findOneAndDelete({ _id: placeId, user: userId });

        if (!favorite) {
            return res.status(404).json({ message: "Favorite place not found" });
        }

        res.status(200).json({ message: "Favorite place removed" });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ message: "Error removing favorite place" });
    }
};
 