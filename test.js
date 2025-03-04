const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

//to add a book
async function addBook(bookName, isbn, author, yearPublished) {
    try {
        const response = await axios.post(`${BASE_URL}/add-book`, {
            bookName,
            isbn,
            author,
            yearPublished
        });
        console.log("Add Book Response:", response.data);
    } catch (error) {
        console.error("Error adding book:", error.message);
    }
}

// Run the tests sequentially
(async () => {
    await addBook("The Hobbit", "978-0-395-07122-6", "J.R.R. Tolkien", "1937");
    await addBook("Harry Potter and the Philosopher's Stone", "978-0-7475-3269-9", "J.K Rowling", "1997");
    await addBook("Harry Potter and the Chamber of Secrets", "0-7475-3849-2", "J.K Rowling", "1998");
    await addBook("The Little Prince", "978-0156012195", "Antoine Saint-Exupery", "1943");
})();




//use this url instead

// http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling
// http://localhost:3000/find-by-author?author=J.K+Rowling
