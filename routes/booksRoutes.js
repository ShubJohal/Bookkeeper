import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { createBook, getAllBooks, getBookById, deleteBook, editBook, updateBook, searchBookCover, liveSearchBooks } from "../controllers/booksController.js";

const router = express.Router();

// Load home page
router.get("/", getAllBooks)

// Load add book page
router.get("/addBook", (req, res) => {
  res.render("add-book");
});

// Load book cover from Open Library Covers API
router.post("/books/get-book-cover", searchBookCover);

//Insert book
router.post("/addBook", upload.single("bookCoverFile"), createBook);
//load book details 

router.get("/books/:id", getBookById);

// delte book
router.post("/books/:id/delete", deleteBook)


//Get Route to Edit book details

router.get("/books/:id/edit", editBook);
router.post("/books/:id/update", upload.single("bookCoverFile"), updateBook);

// Search and filter books
router.get("/books", liveSearchBooks);




export default router;
