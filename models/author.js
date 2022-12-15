import mongoose from "mongoose";
import Book from "./book.js";

const author = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  dateOfDeath: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Author = mongoose.model("Author", author);

export default Author;
