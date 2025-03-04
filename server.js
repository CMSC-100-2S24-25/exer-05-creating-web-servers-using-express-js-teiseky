const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const BOOKS_FILE = path.join(__dirname, 'books.txt');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('HELLO PERD');
});


// add a book
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;

    // validate fields if e
    if (!bookName || !isbn || !author || !yearPublished) {
        return res.json({ success: false });
    }

    const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;
    
    // append book
    fs.appendFile(BOOKS_FILE, bookEntry, (err) => {
        if (err) {
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

// GET: Find book by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;
    if (!isbn || !author) {
        return res.json([]);
    }
    
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) return res.json([]);

        const books = data.split('\n').filter(line => line.trim() !== '');
        const results = books.filter(line => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = line.split(',');
            return bookIsbn === isbn && bookAuthor === author;
        });

        res.json(results.map(line => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = line.split(',');
            return { bookName, isbn: bookIsbn, author: bookAuthor, yearPublished };
        }));
    });
});

// GET: Find book by Author only
app.get('/find-by-author', (req, res) => {
    const { author } = req.query;
    if (!author) {
        return res.json([]);
    }
    
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) return res.json([]);

        const books = data.split('\n').filter(line => line.trim() !== '');
        const results = books.filter(line => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = line.split(',');
            return bookAuthor === author;
        });

        res.json(results.map(line => {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = line.split(',');
            return { bookName, isbn: bookIsbn, author: bookAuthor, yearPublished };
        }));
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
