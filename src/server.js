const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let Links = [
  {
    id: "link-0",
    description: "GraphQL Learning",
    url: "www.howtographql.com",
  },
];

// GraphQL schema definition
// ! はマスト
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    usrl: String!
  }
`;

// GraphQL resolver map
const resolvers = {
  Query: {
    info: () => "Hacker News Clone",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
