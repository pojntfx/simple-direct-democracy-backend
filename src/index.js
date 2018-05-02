import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { PubSub, withFilter } from "graphql-subscriptions";
import { createProposal } from "./resolvers/createProposal";
import { upvoteProposal } from "./resolvers/upvoteProposal";
import { downvoteProposal } from "./resolvers/downvoteProposal";
import { allProposals } from "./resolvers/allProposals";
import { allProposalsReversed } from "./resolvers/allProposalsReversed";

const dbPort = 27017;
const serverPort = 3000;
export const UPDATED_PROPOSAL_TOPIC = "updated_proposals";
export const UPDATED_PROPOSAL_TOPIC_REVERSED = "updated_proposals_reversed";

const typeDefs = fileLoader(path.join(__dirname, "./typedefs"));

const resolvers = {
  Query: {
    allProposals: () => allProposals(),
    allProposalsReversed: () => allProposalsReversed()
  },
  Mutation: {
    createProposal: (_, args) => createProposal(args),
    upvoteProposal: (_, args) => upvoteProposal(args),
    downvoteProposal: (_, args) => downvoteProposal(args)
  },
  Subscription: {
    updatedProposals: {
      subscribe: () => pubsub.asyncIterator(UPDATED_PROPOSAL_TOPIC)
    },
    updatedProposalsReversed: {
      subscribe: () => pubsub.asyncIterator(UPDATED_PROPOSAL_TOPIC_REVERSED)
    }
  }
};

// Enable error handling
require("events").EventEmitter.prototype._maxListeners = 100;

// Connect to the db
mongoose.connect(`mongodb://127.0.0.1:${dbPort}`);

// Start the subscriptions server
export const pubsub = new PubSub();

// Start the api server
new GraphQLServer({ typeDefs, resolvers }).start({ port: serverPort }, () =>
  console.log("Server is running on localhost:3000")
);
