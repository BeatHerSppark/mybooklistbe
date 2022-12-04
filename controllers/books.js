import mongoose from "mongoose";
import BookSchema from "../models/bookSchema.js";

export const getBooks = async (req, res) => {
  try {
    const books = await BookSchema.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const book = await BookSchema.findById(_id);

    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const book = req.body;

  const newBook = new BookSchema(book);

  try {
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id: _id } = req.params;
  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No book with that ID");

  const updatedBook = await BookSchema.findByIdAndUpdate(_id, book, {
    new: true,
  });

  res.json(updatedBook);
};

export const deleteBook = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No book with that ID");

  await BookSchema.findByIdAndRemove(_id);

  res.json({ message: "Book deleted successfully" });
};
