import { Proposal } from "../models/Proposal";

export const createProposal = ({ text, author }) => {
  const newProposal = new Proposal({
    text,
    votes: 0,
    upvoters: [],
    downvoters: [],
    author
  });

  newProposal.save();

  return {
    text: newProposal.text,
    votes: newProposal.votes,
    upvoters: newProposal.upvoters,
    downvoters: newProposal.downvoters,
    author: newProposal.author,
    id: newProposal._id
  };
};
