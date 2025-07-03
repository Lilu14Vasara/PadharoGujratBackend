import mongoose from "mongoose";

const TripPlanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripName: { type: String, required: true },
    plan: [
        {
            time: { type: String, required: true },
            place: { type: String, required: true },
            notes: { type: String, default: "" }, 
        },
    ],
});

export default mongoose.model("TripPlan", TripPlanSchema);
