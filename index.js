const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query, Category, Product } = require("./resolvers/index");
const { categories, products, reviews } = require("./dummyData");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  },
  context: {
    categories: categories,
    products: products,
    reviews: reviews,
  },
});

server.listen().then(({ url }) => console.log("Server is running at", url));
