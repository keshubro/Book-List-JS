// Using ES6

class Book
{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI
{
    addBookToList(book)
    {
        const list = document.getElementById('book-list');
        //Create tr element
        const row = document.createElement('tr');
        //Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className)
    {
        //Create div
        const div = document.createElement('div');
        //Add classes
        div.className = `alert ${className}`; //Two classes : alert and the className which was passed as an argument
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); //Insert div before form in the container

        //Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target)
    {
        if(target.className === "delete")
        {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields()
    {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Strorage Class
class Store
{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks()
    {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        });
    }

    static addBook(book)
    {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    } 

    static removeBook(isbn)
    {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn)
            {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners

// 1. Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    
    //Instantiate a book
    const book = new Book(title, author, isbn);

    //Instantiate a UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === '')
    {
        //Error alert
        ui.showAlert('Please fill in all the fields', 'error');
    }
    else
    {
        //Add Book to list
        ui.addBookToList(book);

        //Add book to local storage
        Store.addBook(book);

        //Show book successfully added
        ui.showAlert('Book successfully added !', 'success');

        //Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// 2. Event listener for delete
const bookList = document.getElementById('book-list'); //Parent of delete button
bookList.addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    //Remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent); //This will give the isbn of the book to be removed
    
    //Show message
    ui.showAlert('Book Removed !', 'success');

    e.preventDefault();
});