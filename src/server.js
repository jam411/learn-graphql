const { ApolloServer, gql } = require("apollo-server");

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// GraphQL resolver map
const resolvers = {
  Query: {
    info: () => "Hacker News Clone",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
