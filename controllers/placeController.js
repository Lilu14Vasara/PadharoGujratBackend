import Place from "../models/Place.js";
import User from "../models/User.js";

// Get all places (for display purposes)
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch places." });
  }
};

// Add a new place (only for logged-in users)
export const addPlace = async (req, res) => {
  const { name, description, image, location } = req.body;
  const userId = req.user.userId; // User ID from the JWT token

  try {
    // Create a new place document
    const newPlace = new Place({
      name,
      description,
      image,
      location,
      userId, // Associate place with the user who added it
    });

    // Save place to the database
    await newPlace.save();

    // Optionally, add the place to the user's saved places (if desired)
    const user = await User.findById(userId);
    user.savedPlaces.push(newPlace._id);
    await user.save();

    res.status(201).json({ message: "Place added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add place." });
  }
};

// Get saved places for a logged-in user
export const getUserSavedPlaces = async (req, res) => {
  const userId = req.user.userId; // User ID from the JWT token

  try {
    // Fetch the user and their saved places
    const user = await User.findById(userId).populate("savedPlaces");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.savedPlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch saved places." });
  }
};
