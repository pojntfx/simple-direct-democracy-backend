import { Proposal } from "../models/Proposal";

// Sort starting with the proposal with the most votes
export const allProposals = () => Proposal.find().sort({ votes: -1 });
