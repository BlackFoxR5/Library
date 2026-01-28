console.log("from scratch");

const myLibrary = []; //empty array that will store the books

//contructor to create new books
function Book(title, author, yearPublished, hasRead) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.hasRead = hasRead;

    this.id = crypto.randomUUID();
}

//calls the constructor and adds them in the library
function addBooksToLibrary(title, author, yearPublished, hasRead) {
    let newBook = new Book(title, author, yearPublished, hasRead);
    myLibrary.push(newBook);
}

//new book with arguments added to the empty array
addBooksToLibrary("Ghost in the wires", "Kevin Mitnick", 2001, "No");
addBooksToLibrary("Fooled by Randomness", "Nassim Nicholas Taleb", 2004, "Yes");

//loops over all the elements in the array and display them in the page

//separates each book from array
function displayBooks(array) {
    for(let i = 0; i < array.length; i++) {
        let book = array[i];
        // console.log(book.title, book.author, book.yearPublished, book.hasRead, book.id);
        
        let bookCard = document.createElement("div"); //cards for the books to shown in
        let container = document.querySelector(".container");
        container.appendChild(bookCard); //cards are added to the container

        bookCard.dataset.unique = book.id; //id of each books added to the DOM

        let titleElement = document.createElement("h1"); //h1 for title
        titleElement.textContent = book.title;
        bookCard.appendChild(titleElement); //title is shown in the card

        let authorElement = document.createElement("p");
        authorElement.textContent = `by ${book.author}`; //p for author
        bookCard.appendChild(authorElement); //author is shown in card

        let yearPublished = document.createElement("p");
        yearPublished.textContent = `Published in: ${book.yearPublished}`;
        bookCard.appendChild(yearPublished); //year of publication shown in card

        let readStatus = document.createElement("p");
        readStatus.textContent = `Read status: ${book.hasRead}`;
        bookCard.appendChild(readStatus); //read status shown in card

        //remove button
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "Remove Book";
        bookCard.appendChild(removeBtn);

        //toggle read status button
        let toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggleBtn");
        toggleBtn.textContent = "Toggle read status";
        bookCard.appendChild(toggleBtn);
    }
}

displayBooks(myLibrary); //displays all the books in the library in the webpage

let addBook = document.querySelector(".newBook"); //refers to the new book button
let showForm = document.querySelector('.askUser'); //refers to the dialog that opens when clicked on new book

//opens a form to add a new book
addBook.addEventListener("click", () => {
    showForm.showModal();
});

let confirm = document.querySelector(".confirmBtn");
let cancel = document.querySelector(".cancelBtn");

//add book in the array and then show it in the page
confirm.addEventListener("click", (e) => {
    e.preventDefault(); //default action normally taken by the implementation as a result of the event will not occur

    let title = document.querySelector("#titleInput").value.trim(); //trim() removes whitespaces from the input. eg "hey ".trim() === "hey"
    let author = document.querySelector("#authorInput").value.trim();
    let yearPublished = Number(document.querySelector("#publishedInput").value.trim()); //converting string to integer
    let readStatus = document.querySelector("#readInput").value.trim();

    if(title === "" || author === "" || yearPublished === "") {
        alert("Form cannot be empty!");
        return false;
    } else {
        addBooksToLibrary(title, author, yearPublished, readStatus);
    
        // console.log(title, author, yearPublished, readStatus, myLibrary[myLibrary.length - 1].id);
    
        let bookCard = document.createElement("div"); //cards for the books to shown in
        let container = document.querySelector(".container");
        container.appendChild(bookCard); //cards are added to the container

        bookCard.dataset.unique = myLibrary[myLibrary.length - 1].id; //id of the last added book is added to DOM

        let titleElement = document.createElement("h1"); //h1 for title
        titleElement.textContent = title;
        bookCard.appendChild(titleElement); //title is shown in the card

        let authorElement = document.createElement("p");
        authorElement.textContent = `by ${author}`; //p for author
        bookCard.appendChild(authorElement); //author is shown in card

        let yearPublished1 = document.createElement("p");
        yearPublished1.textContent = `Published in: ${yearPublished}`;
        bookCard.appendChild(yearPublished1); //year of publication shown in card

        let readStatus1 = document.createElement("p");
        readStatus1.textContent = `Read status: ${readStatus}`;
        bookCard.appendChild(readStatus1); //read status shown in card

        //remove button
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.textContent = "Remove Book";
        bookCard.appendChild(removeBtn);

        //toggle read status button
        let toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggleBtn");
        toggleBtn.textContent = "Toggle read status";
        bookCard.appendChild(toggleBtn);

        // console.table(myLibrary); //debugging
        alert("New book added");
        showForm.close(); //closes the form 

        document.querySelector("#bookForm").reset(); //clears the form from previous inputs
    }
});

//remove form after cancel button is clicked
cancel.addEventListener("click", (e) => {
    e.preventDefault();
    showForm.close();
    alert("No books added");
});

//remove button
let mainContainer = document.querySelector(".container"); //refers to the main container which displays the book cards

mainContainer.addEventListener("click", (e) => {
    if(!e.target.classList.contains("removeBtn")) //checks whether the button clicked contains the class "removeBtn"
        return;

    //search for the unique id related to the card in which the "remove book" button is clicked
    let individualBook = e.target.closest("[data-unique]"); //finds the nearest element that has a "data-unique" attribute
    //console.log(individualBook);

    let individualBookId = individualBook.dataset.unique; //the unique id is stored in a variable
    // console.log(individualBookId);

    //console.log("unique" in individualBook.dataset); //"unique" data-attribute exist in individualBookId.dataset //true

    //find the index of the object that has the "unique id" of the book on which the remove button was clicked
    let index = myLibrary.findIndex(book => book["id"] === individualBookId); //finds the index of the object inside the array

    // console.log(index);

    //remove the object from the array
    if(index !== -1) {
        myLibrary.splice(index, 1);
    }

    //remove book card from DOM
    individualBook.remove();

    alert("Book removed!");
});

//function added to Book prototype 
Book.prototype.toggleRead = function() {
    const current = this.hasRead.toLowerCase();

    if(current === "yes") {
        this.hasRead = "No";
    }else if(current === "no") {
        this.hasRead = "Yes";
    }
}

mainContainer.addEventListener("click", (e) => {
    if(!e.target.classList.contains("toggleBtn")) //checks whether the button clicked contains the class "toggleBtn"
        return;
        // else(alert("toggle btn clicked"));

    //search for the unique id related to the card in which the "toggle read status" button is clicked
    let individualBook = e.target.closest("[data-unique]"); //finds the nearest element that has a "data-unique" attribute
    // console.log(individualBook);

    let individualBookId = individualBook.dataset.unique; //the unique id is stored in a variable
    // console.log(individualBookId);

    //find the object that has the "unique id" of the book on which the toggle button was clicked
    let index = myLibrary.find((item => item.id === individualBookId));
    // console.log(index.hasRead); //read status before function is called

    if(!index)
        return;
    else {
        index.toggleRead();
    }

    // console.log(index["hasRead"]); //read status after function is called
    // console.log(index);

    individualBook.querySelector("div > p:last-of-type").textContent = `Read status: ${index.hasRead}`;
});