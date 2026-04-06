require("dotenv").config();
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root._id });
      return booksByAuthor.length;
    },
  },
  Query: {
    bookCount: async (root) => {
      console.log(root);
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre),
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      /*
      const authorsWithBookCount = authors.map(async (author) => {
        const authorBooks = await Book.find({ author: author._id });
        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount: authorBooks.length,
        };
      });
      */
      return authors;
    },
    me: async (root, args, context) => {
      return await context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("user is not authenticated", {
          code: "USER_AUTHENTICATION_ERROR",
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await Author.insertOne({ name: args.author });
        console.log(author);
      }
      let newBook = {
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres,
      };
      try {
        newBook = await Book.insertOne(newBook);
        await pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new GraphQLError("adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("user is not authenticated", {
          code: "USER_AUTHENTICATION_ERROR",
        });
      }
      let author = await Author.findOne({ name: args.name });
      if (!author) {
        throw new GraphQLError("name is invalid, author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      console.log(author);
      try {
        author.born = args.setBornTo;
        return await author.save();
      } catch (error) {
        throw new GraphQLError("unable to edit born date", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      try {
        const response = await User.insertOne({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return response;
      } catch (error) {
        throw new GraphQLError("unable to edit born date", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      if (args.password !== process.env.PASSWORD) {
        throw new GraphQLError("wrong password", {
          extensions: {
            code: "WRONG_DETAILS",
            error,
          },
        });
      }
      const user = await User.findOne({ username: args.username });
      console.log(user);
      if (!user) {
        throw new GraphQLError("invalid username", {
          extensions: {
            code: "WRONG_DETAILS",
            error,
          },
        });
      }
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
      );
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      //resolver function will always be under the subscribe key
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
