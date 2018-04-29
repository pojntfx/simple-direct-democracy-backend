import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import { createProposal } from "./resolvers/createProposal";
import { upvoteProposal } from "./resolvers/upvoteProposal";
import { downvoteProposal } from "./resolvers/downvoteProposal";

const dbPort = 27017;
const serverPort = 3000;

const typeDefs = `
type Proposal {
    text: String!
    votes: Int!
    upvoters: [String!]!
    downvoters: [String!]!
    author: String!
    id: String!
}
type Query {
  getProposal(id: String!): Proposal
}
type Mutation {
  createProposal(text: String!, author: String!): Proposal!
  upvoteProposal(id: String!): Proposal!,
  downvoteProposal(id: String!): Proposal!
}
`;

const resolvers = {
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
