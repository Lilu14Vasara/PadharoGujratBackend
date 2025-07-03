//const express = require("express");
import mongoose from "mongoose";


const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Place = mongoose.model("Place", placeSchema);
export default Place;
