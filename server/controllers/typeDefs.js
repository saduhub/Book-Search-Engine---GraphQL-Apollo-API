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

  //Possible GET requests. Replaces getting all book objects or getting a book object by id.

  type Query {
    books: [Book]
    book(bookId: String!): Book
  }

 // Possible CREATE, UPDATE, DELETE, requests.   
  type Mutation {
    // adding book to user and removing book from user. Need to add user typedef. 
  }
`;

module.exports = typeDefs;