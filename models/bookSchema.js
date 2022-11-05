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
  released: {
    type: Date,
    default: new Date(),
  },
});

const BookSchema = mongoose.model("BookSchema", bookSchema);

export default BookSchema;
