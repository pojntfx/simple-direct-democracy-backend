import { Proposal } from "../models/Proposal";
import { pubsub, UPDATED_PROPOSAL_TOPIC } from "../index";
import { allProposals } from "../resolvers/allProposals";

export const downvoteProposal = async ({ id }) =>
  Proposal.findOneAndUpdate(
    { _id: id },
    { $inc: { votes: -1 } },
    { new: true },
    (err, proposal) => {
      err
        ? console.log(err)
        : pubsub.publish(UPDATED_PROPOSAL_TOPIC, {
          updatedProposals: allProposals()
          }),
        proposal;
    }
  );
