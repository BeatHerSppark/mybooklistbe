import mongoose from "mongoose";
import Book from "../models/book.js";
import Author from "../models/author.js";
import Genre from "../models/genre.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const book = await Book.findById(_id);

    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const { bookData, authorName, genres } = req.body;

  try {
    const newBook = new Book(bookData);

    // Author
    const existingAuthor = await Author.findOne({ name: authorName });
    let savedAuthor;

    if (existingAuthor) {
      savedAuthor = existingAuthor;
    } else {
      const newAuthor = new Author({ name: authorName });
      savedAuthor = await newAuthor.save();
    }

    newBook.author = savedAuthor._id;

    // Genres
    const genresArr = genres.split(" ");
    for (let i = 0; i < genresArr.length; i++) {
      const existingGenre = await Genre.findOne({ name: genresArr[i] });
      let savedGenre;

      if (existingGenre) {
        savedGenre = existingGenre;
      } else {
        const newGenre = new Genre({ name: genresArr[i] });
        savedGenre = await newGenre.save();
      }
      newBook.genres = [...newBook.genres, savedGenre._id];
    }

    const savedBook = await newBook.save();

    // Add book to author's books array
    await Author.findOneAndUpdate(
      { _id: savedAuthor._id },
      { $push: { books: savedBook._id } },
      { new: true }
    )
      .populate("books")
      .exec();

    res.status(201).json(savedBook);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id: _id } = req.params;
  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No book with that ID");

  const updatedBook = await Book.findByIdAndUpdate(_id, book, {
    new: true,
  });

  res.json(updatedBook);
};

export const deleteBook = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No book with that ID");

  await Book.findByIdAndRemove(_id);

  res.json({ message: "Book deleted successfully" });
};
