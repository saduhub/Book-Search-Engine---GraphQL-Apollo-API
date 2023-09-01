// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      throw new Error({ message: 'Cannot find a user with this id!' });
    }

    return (foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ user = null, params}) {
    const createdUser = await User.create(params.body);

    if (!createdUser) {
      throw new Error({ message: 'Something is wrong!' });
    }
    const token = signToken(createdUser);
    return token;
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ user = null, params}) {
    const userFound = await User.findOne({ $or: [{ username: params.username }, { email: params.email }] });
    if (!userFound) {
      throw new Error({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(params.password);

    if (!correctPw) {
      throw new Error({ message: 'Wrong password!' });
    }
    const token = signToken(userFound);
    return token;
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user = null, params}) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  // remove a book from `savedBooks`
  async deleteBook({ user, params }) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error({ message: "Couldn't find user with this id!" });
    }
    return (updatedUser);
  },
};
