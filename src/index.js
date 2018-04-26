import { GraphQLServer } from "graphql-yoga";
import redis from "redis";
import { promisify } from "util";
import { createProposal } from "./resolvers/createProposal";

const typeDefs = `
type Proposal {
    title: String!
    text: String!
    ip: String!
}
type Query {
    getProposal(id: String!): Proposal
    getAllProposals: [Proposal]
}
type Mutation {
    createProposal(title: String!, text: String!, ip: String!): Proposal
    updateProposal(id: String!, title: String!, text: String!): Proposal
    deleteProposal(id: String!): String! # id
}
`;

const resolvers = {
  Mutation: {
    createProposal: (_, { title, text, ip }) =>
      createProposal({ title, text, ip })
  }
};

export const db = redis.createClient();
export const hget = promisify(db.hget).bind(db);
export const keys = promisify(db.keys).bind(db);
export const hsetnx = promisify(db.hsetnx).bind(db);

const server = new GraphQLServer({ typeDefs, resolvers });

db.set("aval", "string val", redis.print);

server.start({ port: 3000 }, () =>
  console.log("Server is running on localhost:3000")
);
