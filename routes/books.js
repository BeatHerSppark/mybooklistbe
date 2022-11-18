import express from "express";

import { getBooks, addBook, updateBook } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.patch("/:id", updateBook);

export default router;
