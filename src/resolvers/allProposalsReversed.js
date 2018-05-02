import { Proposal } from "../models/Proposal";

// Sort starting with the proposal with the least votes
// TODO: Add pagination
export const allProposalsReversed = () => Proposal.find().sort({ votes: 1 });
