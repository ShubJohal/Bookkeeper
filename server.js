import express from 'express';
import bodyParser from 'body-parser';
import db from "./db/db.js";
import booksRoutes from "./routes/booksRoutes.js";

const app = express();
const port = 3000;  

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

/* Set up EJS as the view engine*/
app.set('view engine', 'ejs');

/*Routes*/
app.use('/', booksRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});