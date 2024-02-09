class Book{
    constructor(title,author,isbn,genre){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        this.genre=genre;
        this.availability = true;
        console.log("in book constructor");
    }
}

class LibraryCatalog{
    constructor(){
        this.books=JSON.parse(localStorage.getItem('bookcatalog')) || [];
        console.log("catalog constructer");
    }
    createbook(title,author,isbn,genre){
        let newbook=new Book(title,author,isbn,genre);
        this.addBook(newbook);
    }
    addBook(book) {
        this.books.push(book);
        this.addtostorage();
        this.display();
        console.log("add book working");
    }
    removeBook(isbn) {
        this.books = this.books.filter(book => book.isbn !== isbn);
        this.addtostorage();
        this.display();
    }
    addtostorage(){
        localStorage.setItem('bookcatalog', JSON.stringify(this.books));
        console.log("suceesfully stored");
    }
    display() {
        const container = document.getElementById('display');
        container.innerHTML = '';
        this.books.forEach(book => {
            const Item = document.createElement('div');
            Item.classList.add('items');
            Item.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Availability:</strong> ${book.availability ? 'Available' : 'Not Available'}</p>
                <button onclick="removeBook('${book.isbn}')">Remove</button>
                <button onclick="checkoutBook('${book.isbn}')">Checkout</button>
                <button onclick="returnBook('${book.isbn}')">Return</button>
            `;
            container.appendChild(Item);
        });
    }
    checkoutBook(isbn){
        console.log(this.books);
        const check = this.books.find(book => book.isbn === isbn);
        if (check) {
            if(check.availability==false){
                alert("alredy checked out");
            }
            else{
            console.log(check.availability);
            check.availability = false;
            this.addtostorage();
            this.display();
            alert(`Book ${check.title} has been checked out.`);
            console.log(check.availability);
            console.log(check.title);
            console.log(check.author);
            console.log(check.genre);
            }
        } else {
            alert('Book not found.');
        }
    }
    returnBook(isbn){
        const check = this.books.find(book => book.isbn === isbn);
        if (check) {
            if(check.availability==true){
                alert("it is not checked out");
            }
            else{
            check.availability = true;
            this.addtostorage();
            this.display();
            alert(`Book "${check.title}" has been returned.`);
            }
        } else {
            alert('Book not found.');
        }

    }
    searchbook(key){
        let keyx=key.toLowerCase();
        console.log(keyx);
        const filteredBooks = this.books.filter(book =>
            book.title.toLowerCase().includes(keyx) ||
            book.author.toLowerCase().includes(keyx) ||
            book.genre.toLowerCase().includes(keyx)
        );
        console.log(filteredBooks);
        this.displaysearch(filteredBooks);
    }
    displaysearch(filteredBooks){
        const container = document.getElementById('display');
        container.innerHTML = '';
        filteredBooks.forEach(book => {
            const Item = document.createElement('div');
            Item.classList.add('items');
            Item.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Availability:</strong> ${book.availability ? 'Available' : 'Not Available'}</p>
                <button onclick="removeBook('${book.isbn}')">Remove</button>
                <button onclick="checkoutBook('${book.isbn}')">Checkout</button>
                <button onclick="returnBook('${book.isbn}')">Return</button>
            `;
            container.appendChild(Item);
        });
    }
}

function removeBook(isbn){
    libraryobj.removeBook(isbn);
}
function checkoutBook(isbn){
    libraryobj.checkoutBook(isbn);
}
function returnBook(isbn){
    libraryobj.returnBook(isbn);
}
document.getElementById('frm1').addEventListener('submit',function(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const genre = document.getElementById('genre').value;
    console.log("inside event listner");
    libraryobj.createbook(title,author,isbn,genre);
    frm1.reset();
})
document.getElementById('search').addEventListener('input', function(e) {
    let x=document.getElementById('search').value;
    if(x===""){
        libraryobj.display();
    }
    console.log(x);
    libraryobj.searchbook(x);
});
const libraryobj=new LibraryCatalog();
libraryobj.display();