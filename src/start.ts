import { GraphQLServer } from "graphql-yoga";

export class SimpleDirectDemocracyBackend {
  private typeDefs: string;
  private resolvers;
  private server: GraphQLServer;

  constructor() {
    this.typeDefs = `
    type Query {
        hello(name: String): String!
    }
    `;

    this.resolvers = {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    };

    this.server = new GraphQLServer({
      resolvers: this.resolvers,
      typeDefs: this.typeDefs
    });
  }

  public start = ({ port }: { port: number }) =>
    this.server.start({ port }, () =>
      console.log(`Backend is running on http://localhost:${port}`)
    );
}
