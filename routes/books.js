import express from "express";

import { getBooks, addBook } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);

export default router;
