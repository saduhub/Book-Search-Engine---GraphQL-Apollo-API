const express = require('express');
// Require Apollo server for Express
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// Require the typedefs and resolvers/
const { typeDefs } = require('./controllers/typeDefs.js');
console.log(typeDefs);
const { resolvers } = require('./controllers/resolvers.js');
console.log(resolvers);
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
// Pass typedefs and resolvers to Apollo server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// On load once deployed.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

//Create instance of Apollo server with the GraphQL.
const startApolloServer = async () => {
  // Wait for Apollo server.
  await server.start();
  server.applyMiddleware({ app });
  // Wait for connection with db.
  db.once('open', () => {
    // Wait for Express server.
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

// Call the async function to start the servers and connection to db.
startApolloServer();
