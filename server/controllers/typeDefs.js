const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    books: [Book]
    me(token: String!): User
  }
  
  type Mutation {
    deleteBook(bookId: String!): Book
  }
`;

module.exports = typeDefs;