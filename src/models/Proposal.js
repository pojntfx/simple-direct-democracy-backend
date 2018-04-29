import mongoose from "mongoose";

export const Proposal = mongoose.model(
  "Proposal",
  new mongoose.Schema({
    text: String,
    votes: Number,
    upvoters: [String], // UserIDs
    downvoters: [String], // UserIDs
    author: String // Private IP
  })
);
