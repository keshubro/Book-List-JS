//Book constructor
function Book(title, author, isbn)
{
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI()
{

}

//Add book to the list when the submit button is clicked
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#' class="delete">X</a></td>
    `;
    list.appendChild(row);
}

//Create fields after clicking the submit button
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate a book
    const book = new Book(title, author, isbn);

    //Instantiate a UI
    const ui = new UI();

    //Add Book to list
    ui.addBookToList(book);

    //Clear fields
    ui.clearFields();

    e.preventDefault();
});

