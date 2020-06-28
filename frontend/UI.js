/*
Desde esta clase se manipula el dom
*/
import { format } from 'timeago.js';
import BookService from './services/BookServices';
const bookService = new BookService();

class UI {

   async renderBook() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('book-cards');
        booksCardContainer.innerHTML = '';
           
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML =`
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000/${book.imagePath}" alt="${book.imagePath}" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-blick px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>      
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        });        
    }

    async addNewBook(book) {
      await bookService.postBook(book);
      this.clearBookForm();
      this.renderBook();
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    renderMessage() {

    }

    async deleteBook(bookId) {
        bookService.deleteBook(bookId);
        this.clearBookForm();
        this.renderBook();
    }
}

export default UI;