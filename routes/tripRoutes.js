import express from "express";
import { addTripPlan, getTripPlans, deleteTripPlan } from "../controllers/tripController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTripPlan);
router.get("/", authMiddleware, getTripPlans);
router.delete("/:id", authMiddleware, deleteTripPlan);

export default router;
