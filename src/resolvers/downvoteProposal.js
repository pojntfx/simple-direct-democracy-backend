import { Proposal } from "../models/Proposal";

export const downvoteProposal = ({ id }) =>
  Proposal.findOneAndUpdate(
    { _id: id },
    { $inc: { votes: -1 } },
    { new: true },
    (err, proposal) => (err ? console.log(err) : proposal)
  );
