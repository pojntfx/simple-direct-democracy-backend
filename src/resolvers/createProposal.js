import { Proposal } from "../models/Proposal";
import { pubsub, UPDATED_PROPOSAL_TOPIC } from "../index";
import { allProposals } from "../resolvers/allProposals";
import { createError } from "apollo-errors";

export const createProposal = ({ text, author }) => {
  const newProposal = new Proposal({
    text,
    votes: 0,
    upvoters: [],
    downvoters: [],
    author
  });

  if (text !== "" || (undefined && author !== "") || undefined) {
    return Proposal.findOne({ text })
      .count()
      .then(res => {
        if (res === 0) {
          saveAndReturn(newProposal);
        } else {
          return Promise.reject(
            "You can't create multiple identical proposals"
          );
        }
      })
      .catch(error => {
        const MulitpleIdenticalErrorProposalsError = createError(
          "MulitpleIdenticalErrorProposalsError",
          {
            message: error
          }
        );
        throw new MulitpleIdenticalErrorProposalsError();
      });
  } else {
    const NoTextOrAuthorInfo = createError("NoTextOrAuthorInfoError", {
      message:
        "You can't create an empty proposal or create one without your IP"
    });
    throw new MulitpleIdenticalErrorProposalsError();
  }
};

const saveAndReturn = newProposal => {
  newProposal.save();

  pubsub.publish(UPDATED_PROPOSAL_TOPIC, {
    updatedProposals: allProposals()
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
