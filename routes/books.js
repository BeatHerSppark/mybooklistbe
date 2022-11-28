import express from "express";

import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
