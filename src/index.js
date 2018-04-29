import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { createProposal } from "./resolvers/createProposal";
import { upvoteProposal } from "./resolvers/upvoteProposal";
import { downvoteProposal } from "./resolvers/downvoteProposal";
import { allProposals } from "./resolvers/allProposals";

const dbPort = 27017;
const serverPort = 3000;

const typeDefs = fileLoader(path.join(__dirname, "./typedefs"));

const resolvers = {
  Query: {
    allProposals: () => allProposals()
  },
  Mutation: {
    createProposal: (_, args) => createProposal(args),
    upvoteProposal: (_, args) => upvoteProposal(args),
    downvoteProposal: (_, args) => downvoteProposal(args)
  }
};

// Connect to the db
mongoose.connect(`mongodb://127.0.0.1:${dbPort}`);

// Start the api server
new GraphQLServer({ typeDefs, resolvers }).start({ port: serverPort }, () =>
  console.log("Server is running on localhost:3000")
);
