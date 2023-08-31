const userController  = require('./user-controller')
const auth = require('../utils/auth')
const resolvers = {
  Query: {
    me: async (parent, args) => {
      const user = await auth.authMiddleware(args.token)
      return await userController.getSingleUser({
        user,
        params: {
          id: args.token.id,
          username: args.token.username
        }
      })
    },
  },
  Mutation: {
    deleteBook: async (parent, args) => {
      await auth.authMiddleware(args.token)
      return await userController.deleteBook({
        user: args.token,
        params: {
          bookId: args.bookId
        }
      })
    },
    
  },
};

module.exports = resolvers;