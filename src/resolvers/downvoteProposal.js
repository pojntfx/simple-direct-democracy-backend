import { Proposal } from "../models/Proposal";
import { pubsub, UPDATED_PROPOSAL_TOPIC } from "../index";
import { allProposals } from "../resolvers/allProposals";
import { createError } from "apollo-errors";

export const downvoteProposal = async ({ id, author }) => {
  try {
    await Proposal.findOne({ _id: id }).then(
      res =>
        //   console.log(
        //     `Requester: ${author}
        //           Author: ${res.author}
        //           Author is requester: ${!(res.author === author)}
        //           Downvoters: ${res.downvoters}
        //           Is downvoter: ${!res.downvoters.includes(author)}
        //           Should be updated: ${!(res.author === author) &&
        //             !res.downvoters.includes(author)}`
        //   )
        // );
        // You shouldn't be able to upvote your own proposals
        !(res.author === author) && !res.downvoters.includes(author)
          ? Proposal.findOneAndUpdate(
              { _id: id },
              { $inc: { votes: -1 }, $push: { downvoters: author } },
              { new: true },
              (err, proposal) => {
                err
                  ? console.log(err)
                  : pubsub.publish(UPDATED_PROPOSAL_TOPIC, {
                      updatedProposals: allProposals()
                    }),
                  proposal;
              }
            )
          : Promise.reject(
              "You can't vote on your own proposal nor can you vote multiple times!"
            )
    );
  } catch (error) {
    const IllegalVoteError = createError("IllegalVoteError", {
      message: error
    });
    throw new IllegalVoteError();
  }
};
