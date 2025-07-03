import Review from "../models/Review.js";

// Add a Review 
export const addReview = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const userId = req.user?.userId; 

    if (!text || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const review = new Review({
      text,
      rating,
      user: userId,
    });

    await review.save();
    await review.populate("user", "name"); // Populate username

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Reviews 
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name"); //  Fixed "fullName" issue
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a Review (Only by the User Who Posted It) 
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
