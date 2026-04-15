import * as booksModel from "../models/booksModel.js";
import { getBookCover } from "../services/bookCover.js";
// Function to fetch book cover from Open Library Covers API

export const searchBookCover = async (req, res) => {
    const { title, author } = req.body;
    try {
        const coverUrl = await getBookCover(title, author);
        res.json({ coverUrl });
        console.log("Book cover URL:", coverUrl);
    } catch (error) {
        console.error("Error fetching book cover:", error);
        res.status(500).json({ error: "Error fetching book cover" });
    }
};



// Add Book controller

export const createBook = async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const read = req.body.read;
    const notes = req.body.notes;
    const rating = req.body.rating;

    const apiCoverUrl = await getBookCover(title, author);

    let finalCover;

    if (apiCoverUrl) {
      finalCover = apiCoverUrl;
    } else if (req.file) {
      finalCover = `/uploads/${req.file.filename}`;
    } else {
      finalCover = "/images/default-book-cover.jpg";
    }

    await booksModel.createBook(title, author, read, notes, rating, finalCover);

    res.redirect("/?success=Book added successfully");
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).send("Failed to create book");
  }
};
    // Get all books controller

    export const getAllBooks = async (req, res) => {
        try {
            const books = await booksModel.getAllBooks();
            console.log(books);
            res.render("index", { books });
        } catch (err) {
            console.error("Error fetching books:", err);
            res.status(500).send("Error fetching books");
        }
    };

    // Get book by ID controller

    export const getBookById = async (req, res) => {
        const id = req.params.id;
        try {
            const book = await booksModel.getBookById(id);
            if (book) {
                res.render("book-details", { book });
            } else {
                res.status(404).send("Book not found");
            }           
    }
 catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).send("Error fetching book by ID");
}
    };

    // Delete book controller

    export const deleteBook = async (req, res) => {
        const id = req.params.id;
        try {
            await booksModel.deleteBook(id);
            res.redirect("/?success=Book deleted successfully");
        } catch (err) {
            console.error("Error deleting book:", err);
            res.status(500).send("Error deleting book");
        }
    };

    // Edit book details controller

export const editBook = async (req, res) => {
        const id = req.params.id;   
        // Logic to fetch book details and render edit page
        const book = await booksModel.getBookById(id);
        res.render("edit-book", { book });
    }

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, read, notes, rating } = req.body;

  try {
    const existingBook = await booksModel.getBookById(id);

    const apiCoverUrl = await getBookCover(title, author);

    let finalCover;

    if (req.file) {
      finalCover = `/uploads/${req.file.filename}`;
    } else if (apiCoverUrl) {
      finalCover = apiCoverUrl;
    } else if (existingBook.book_cover) {
      finalCover = existingBook.book_cover;
    } else {
      finalCover = "/images/default-book-cover.jpg";
    }

    await booksModel.updateBook(id, title, author, read, notes, rating, finalCover);
    res.redirect(`/books/${id}` + "?success=Book updated successfully");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
};

// Live search and filter books controller
export const liveSearchBooks = async (req, res) => {
    const {search = "", sortby = "", rating = ""} = req.query;
    try {
        const books = await booksModel.liveSearchBooks(search, sortby, rating);
        res.json(books);
    } catch (err) {
        console.error("Error searching books:", err);
        res.status(500).send("Error searching books");
    }
};