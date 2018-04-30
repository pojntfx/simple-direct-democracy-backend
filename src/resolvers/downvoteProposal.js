import { Proposal } from "../models/Proposal";
import { pubsub, UPDATED_PROPOSAL_TOPIC } from "../index";
import { allProposals } from "../resolvers/allProposals";
import { createError } from "apollo-errors";

export const downvoteProposal = async ({ id, author }) => {
  try {
    return await Proposal.findOne({ author }).then(
      ({ author }) =>
        // You shouldn't be able to upvote your own proposals
        author === author
          ? Promise.reject("You can't vote on your own proposal")
          : updateAndReturn(id)
    );
  } catch (error) {
    const AuthorTriedToVoteOnOwnProposalError = createError(
      "AuthorTriedToVoteOnOwnProposalError",
      {
        message: error
      }
    );
    throw new AuthorTriedToVoteOnOwnProposalError();
  }
};

const updateAndReturn = ({ id }) =>
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
