import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
