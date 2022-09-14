const { ApolloServer, gql } = require("apollo-server");
const { products, categories } = require("./dummyData");

const typeDefs = gql`
  type Query {
    hello: [String!]!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return ["World"];
    },
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find((product) => product.id === productId);

      return product ? product : null;
    },
    categories: () => categories,
    category: (parent, args, context) => {
      const categoryId = args.id;

      const category = categories.find(
        (category) => categoryId === category.id
      );

      return category ? category : null;
    },
  },
  Category: {
    products: (parent, args, context) => {
      const { id } = parent;

      return products.filter((product) => product.categoryId === id);
    },
  },
  Product: {
    category: (parent, args, context) => {
      const { categoryId } = parent;

      return categories.find((category) => category.id === categoryId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log("Server is running at", url));
