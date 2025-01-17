class BookServices {

    constructor() {
        this.URI = 'http://localhost:3000/api/books';
    }

    async getBooks( ) {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

   async postBook(book) {
        const response = await fetch(this.URI, {
            method: 'POST',
            body: book
        });
        const  data = await response.json();
        console.log(data);
        return data;
    }

    async deleteBook(bookId) {
        const response = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }
}

module.exports = BookServices;