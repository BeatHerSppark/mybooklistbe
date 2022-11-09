import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  genres: [String],
  bookImg: String,
  rating: {
    type: Number,
    default: 0,
  },
  released: String,
});

const BookSchema = mongoose.model("BookSchema", bookSchema);

export default BookSchema;
