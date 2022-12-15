import mongoose from "mongoose";
import Book from "./book.js";

const genre = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const Genre = mongoose.model("Genre", genre);

export default Genre;
