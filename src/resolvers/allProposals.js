import { Proposal } from "../models/Proposal";

// Sort starting with the proposal with the most votes
// TODO: Add pagination
export const allProposals = () => Proposal.find().sort({ votes: -1 });
