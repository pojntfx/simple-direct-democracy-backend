import { Proposal } from "../models/Proposal";
import { pubsub, UPDATED_PROPOSAL_TOPIC } from "../index";
import { allProposals } from "../resolvers/allProposals";

export const createProposal = ({ text, author }) => {
  const newProposal = new Proposal({
    text,
    votes: 0,
    upvoters: [],
    downvoters: [],
    author
  });

  newProposal.save();

  pubsub.publish(UPDATED_PROPOSAL_TOPIC, {
    updatedProposal: allProposals()
  });

  return {
    text: newProposal.text,
    votes: newProposal.votes,
    upvoters: newProposal.upvoters,
    downvoters: newProposal.downvoters,
    author: newProposal.author,
    id: newProposal._id
  };
};
