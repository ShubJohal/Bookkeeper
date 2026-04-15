import db from "../db/db.js";

// Create a new book    

export const createBook = async (title, author, date_read, notes, rating, book_cover) => {
    try { 
        const query = `insert into books (title, author, date_read, notes, rating, book_cover)
        values ($1, $2, $3, $4, $5, $6)`;
        const values = [title, author, date_read, notes, rating, book_cover];
        await db.query(query, values);
    } catch (err) {
        console.error("Error creating book:", err);
    }   

};

// Get all books
export const getAllBooks = async () => {

    try {
        const query = "SELECT * FROM books ORDER BY date_read DESC";
        const result = await db.query(query);
        //console.log(result.rows);
        return result.rows;
        
    } catch (err) {
        console.error("Error fetching books:", err);
    }

};

// Get a book by ID
export const getBookById = async (id) => {
    try {
        const query = "SELECT * FROM books WHERE id = $1";
        const result = await db.query(query, [id]);
        return result.rows[0];
    } catch (err) {
        console.error("Error fetching book by ID:", err);
    }
};


// Delete a book by ID
export const deleteBook = async (id) => {
    try {
        const query = "DELETE FROM books WHERE id = $1";
        await db.query(query, [id]);
    } catch (err) {
        console.error("Error deleting book:", err);
    }
};

//view book detials

export const editBook = async (id) => {

    try{
        const query = "SELECT * FROM books WHERE id = $1";
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
    catch (err) {
        console.error("Error fetching book by ID for editing:", err);
    }

};

export const updateBook = async (id, title, author, date_read, notes, rating, book_cover) => {
    try {
        const query = `
            UPDATE books
            SET title = $1,
                author = $2,
                date_read = $3,
                notes = $4,
                rating = $5,
                book_cover = $6
            WHERE id = $7
        `;
        const values = [title, author, date_read, notes, rating, book_cover, id];
        await db.query(query, values);
    } catch (err) {
        console.error("Error updating book:", err);
        throw err;
    }
};

// Search and filter books for live search functionality

export const liveSearchBooks = async (search, sortby, rating) => {

    try{
        let query = "SELECT * FROM books WHERE (title ILIKE $1 OR author ILIKE $1)";
        const values = [`%${search}%`];

        let sortQuery = "";
        if (sortby === "title") {
            sortQuery = " ORDER BY title ASC";
        } else if (sortby === "author") {
            sortQuery = " ORDER BY author ASC";
        }   else if (sortby === "date_read") {  
            sortQuery = " ORDER BY date_read DESC";
    }
        query += sortQuery;

        if (rating) {
            query = `SELECT * FROM (${query}) AS subquery WHERE rating = $${values.length + 1}`;
         
            values.push(rating);
        }

        const result = await db.query(query, values);
        return result.rows;

   
} catch (err) {
    console.error("Error fetching books with search and filter:", err);
    throw err;
}
};