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

  //Possible GET requests. Replaces getting all book objects associated with a user.

  type Query {
    books: [Book]
    me(token: String!): User
  }

 // Possible CREATE, UPDATE, DELETE, requests.   
  type Mutation {
    // adding book to user and removing book from user. Need to add user typedef. 
    will add or remove book(bookId: String!): Book
  }
`;

module.exports = typeDefs;