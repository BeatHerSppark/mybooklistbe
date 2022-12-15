import mongoose from "mongoose";
import Author from "./author.js";
import Genre from "./genre.js";

const book = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  // rating: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //     rating: {
  //       type: Number,
  //       min: 1,
  //       max: 10,
  //     },
  //   },
  // ],
  bookImg: String,
});

const Book = mongoose.model("Book", book);

export default Book;
