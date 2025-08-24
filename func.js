console.log('Small library app');

const library = []; // the books will stored in this array

//book constructor
function Book(title, author, published, hasRead) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.hasRead = hasRead;

    this.uniqueId = crypto.randomUUID(); //generates a unique ID for each book
}

//function to create the book and store it in the empty array
function booksToLibrary(title, author, published, hasRead) {
    let newBook = new Book(title, author, published, hasRead); //calling the book constructor and saving the object in the declared variable
    library.push(newBook); //adding the object to the 'library' array
}

//books are created
booksToLibrary('Fooled by Randomness', 'Nassim Nicholas Taleb', 2001, 'Yes');
booksToLibrary("1984", "George Orwell", 1949, "No");
booksToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, "No");
booksToLibrary('Thus Spoke Zarathustra', 'Friedrich Nietzsche', 1883, 'Yes');

let container = document.querySelector('.container');

//function that loops through the array and displays each book on the page
function sortInPage(array) {
    for(let i = 0; i < array.length; i++) {
        let book = array[i];
        console.log(book.title, book.author, book.published, book.hasRead);

        let bookInfo = document.createElement("div"); //the div where the book content will be displayed

        let titleElement = document.createElement("h1");
        let titleStrong = document.createElement("strong");
        titleStrong.textContent = book.title;
        titleElement.appendChild(titleStrong); //strong p for the title
        
        let authorElement = document.createElement("p");
        authorElement.textContent = `by ${book.author}`; //p for author
        
        let publishedElement = document.createElement("p");
        publishedElement.textContent = `Published: ${book.published}`; //p for year published
        
        let readElement = document.createElement("p");
        readElement.textContent = `Read: ${book.hasRead}`; //p for read status
        
        //adds all the p into the div
        bookInfo.appendChild(titleElement);
        bookInfo.appendChild(authorElement);
        bookInfo.appendChild(publishedElement);
        bookInfo.appendChild(readElement);
        
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        removeBtn.textContent = 'Remove Book';
        bookInfo.appendChild(removeBtn);

        //adds div into the page
        container.appendChild(bookInfo);
    }
}

sortInPage(library); //this places the books in the page and display them in the console

let addBookButton = document.querySelector('.newBook');
let showForm = document.querySelector('.askUser');
let confirmBtn = showForm.querySelector('.confirmBtn');
let cancelBtn = showForm.querySelector('.cancelBtn');

addBookButton.addEventListener('click', () => {
    // alert('Hooray! you clicked the button!!!');
    showForm.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('No books added');
    showForm.close();
});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Book added!');
    showForm.close();

    //saving the input value to use it as params to create book in library
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const published = document.getElementById("publishedInput").value;
    const hasRead = document.getElementById("readInput").value;

    booksToLibrary(title, author, published, hasRead); //adds new book to library

    //add the single new book entered by user in modal form
    let singleBookInfo = document.createElement("div");

    let titleElement = document.createElement("h1");
    let titleStrong = document.createElement("strong");
    titleStrong.textContent = title;
    titleElement.appendChild(titleStrong); //creates bold p for title
    
    let authorElement = document.createElement("p"); //creates p for author
    authorElement.textContent = `by ${author}`; 
        
    let publishedElement = document.createElement("p"); //creates p for published year
    publishedElement.textContent = `Published: ${published}`;
    
    let readElement = document.createElement("p"); //creates p for read status
    readElement.textContent = `Read: ${hasRead}`;
    

    //adds all the p into the div
    singleBookInfo.appendChild(titleElement);
    singleBookInfo.appendChild(authorElement);
    singleBookInfo.appendChild(publishedElement);
    singleBookInfo.appendChild(readElement);

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent = 'Remove Book';
    singleBookInfo.appendChild(removeBtn);

    //add the div to the body
    container.appendChild(singleBookInfo);

    console.log(title, author, published, hasRead);

    //resets the form of previous inputs
    document.getElementById("bookForm").reset();
});