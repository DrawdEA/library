const newBook = document.querySelector("#new-book");
const prompt = document.querySelector("#new-book-prompt");
const form = document.querySelector("#create-book-form");
const close = document.querySelector("#close");

const books = document.querySelector("#books")

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const hasRead = document.querySelector("#hasRead");

const myLibrary = [];

class Book {
    constructor(author, title, pages, hasRead) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.hasRead = hasRead;
    }
}

function addBookToLibrary(author, title, pages, hasRead) {
  myLibrary.push(new Book(author, title, pages, hasRead));
}

function renderBooks() {
    // Removes all children.
    books.replaceChildren();

    // Iterates through all of the books and displays them.
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i]

        const card = document.createElement("div");
        card.classList.add("book");

        const title = document.createElement("h2");
        title.classList.add("title");
        title.textContent = book.title;

        const close = document.createElement("button");
        close.classList.add("close");
        close.textContent = "remove";

        close.addEventListener("click", (e) => {
            myLibrary.splice(i, 1);
            renderBooks();
        })

        title.appendChild(close)


        const author = document.createElement("h4");
        author.classList.add("author");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${book.pages}`;

        const hasRead = document.createElement("p");
        hasRead.classList.add("hasRead");
        hasRead.textContent = `Status: ${book.hasRead ? "Read" : "Unread"}`;

        const toggleRead = document.createElement("button");
        toggleRead.classList.add("toggleRead");
        toggleRead.textContent = "Toggle";

        toggleRead.addEventListener("click", (e) => {
            book.hasRead = !book.hasRead;
            renderBooks();
        })

        hasRead.appendChild(toggleRead)

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(hasRead);

        books.appendChild(card);
    }
}

// Opens and closes the prompt to create a new book.
newBook.addEventListener("click", (e) => {
    prompt.showModal();
})

close.addEventListener("click", (e) => {
    prompt.close();
})

title.addEventListener("input", () => {
    if (title.validity.patternMismatch) {
        title.setCustomValidity("Too short!");
    } else {
        title.setCustomValidity("");
    }
})

author.addEventListener("input", () => {
    if (author.validity.patternMismatch) {
        author.setCustomValidity("Must have a last and first name!");
    } else {
        author.setCustomValidity("");
    }
})

// Checks when a new book is added.
form.addEventListener("submit", (e) => {
    event.preventDefault();
    addBookToLibrary(author.value, title.value, pages.value, hasRead.checked);
    prompt.close();
    form.reset();

    renderBooks();
})