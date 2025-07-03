import TripPlan from "../models/TripPlan.js";

// Add a Trip Plan
export const addTripPlan = async (req, res) => {
    try {
        const { tripName, plan } = req.body;
        const userId = req.user.userId;

        if (!tripName || !plan || plan.length === 0) {
            return res.status(400).json({ message: "Trip name and at least one place are required." });
        }

        const updatedPlan = plan.map(item => ({
            time: item.time,
            place: item.place,
            notes: item.notes || "",  // Default empty if not provided
        }));

        const trip = new TripPlan({ user: userId, tripName, plan:updatedPlan  });
        await trip.save();

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: "Error saving trip", error: error.message });
    }
};

// Get All Trip Plans for Logged-in User
export const getTripPlans = async (req, res) => {
    try {
        const userId = req.user.userId;
        const trips = await TripPlan.find({ user: userId });

        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error: error.message });
    }
};

// Delete a Trip Plan
export const deleteTripPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const trip = await TripPlan.findOneAndDelete({ _id: id, user: userId });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting trip", error: error.message });
    }
};
