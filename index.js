// Javascript

// const addButton = $("#addBtn");
// addButton.addEventListener('click', addBookToLibrary);
// const newBookBtn = document.querySelector("#newBtn");
// newBookBtn.addEventListener('click', () => {
//     popUpForm.style.display = 'block';
// })
// const popUpForm = document.getElementById('popUp');
// const closePopUp = document.getElementsByTagName("span")[0];
// closePopUp.addEventListener('click', () => {
//     popUpForm.style.display = 'none';
// });


// jQuery

$("#addBtn").click((event) => {
    event.preventDefault();
    addBookToLibrary();
});
$("#newBtn").click(() => {
    $("#popUp").css('display', 'block');
});
$("span.close").click(() => {
    $("#popUp").css('display', 'none');
});

class Book {
    constructor(_title, _author, _pages, _read) {
        this.title = $('#title').val();
        this.author = $('#author').val();
        this.pages = $('#pages').val();
        this.read = $('read').val();
    }
}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    
    $("#popUp").css('display', 'none');

    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    setData();
    render();
    $("#form").trigger("reset");
}

function render() {
    const display = document.getElementById('Library-container');
    // const display = $('#Library-container');

    const books = document.querySelectorAll('.book');
    // const books = $('.book');

    books.forEach((book) => {
        display.removeChild(book);
    });
    for(let i=0; i<myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(item) {

    const library = document.getElementById('Library-container');
    // const library = $('#Library-container');

    const bookDiv = document.createElement('div');
    // const bookDiv = $('<div/>');

    const titleDiv = document.createElement('div');
    // const titleDiv = $('<div/>');

    const authorDiv = document.createElement('div');
    // const bookDiv = $('<div/>');
    
    const pagesDiv = document.createElement('div');
    // const pagesDiv = $('<div/>');
    
    const removeBtn = document.createElement('button');
    // const removeBtn = $('<button/>');
    
    const readBtn = document.createElement('button');
    // const readBtn = $('<button/>');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));
    // bookDiv.addClass('book');
    // bookDiv.attr('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);
    // titleDiv.text(item.title);
    // titleDiv.addClass('title');
    // bookDiv.append(titleDiv);
    
    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);
    // authorDiv.text(item.author);
    // authorDiv.addClass('author');
    // bookDiv.append(authorDiv);

    pagesDiv.textContent = item.pages;
    pagesDiv.classList.add('pages');
    bookDiv.appendChild(pagesDiv);
    // pagesDiv.text(item.pages);
    // pagesDiv.addClass('pages');
    // bookDiv.append(pagesDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    // readBtn.addClass('readBtn');
    // bookDiv.append(readBtn);

    if(item.read === false) {
        readBtn.textContent = 'UnRead';
        readBtn.style.backgroundColor = 'red';
        // readBtn.text('UnRead');
        // readBtn.css('background-color', 'red');
    }
    else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = 'green';
        // readBtn.text('Read');
        // readBtn.css('background-color', 'green');
    }
    
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);
    // removeBtn.textContent('Remove');
    // removeBtn.attributeStyleMap('id', 'removeBtn');
    // bookDiv.append(removeBtn);
    
    library.appendChild(bookDiv);
    // library.append(bookDiv);
    
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        render();
    });
    // removeBtn.click(() => {
    //     myLibrary.splice(myLibrary.indexOf(item), 1);
    //     setData();
    //     render();
    // });
    
    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        render();
    });
    // readBtn.click(() => {
    //     item.read = !item.read;
    //     setData();
    //     render();
    // });
}

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if(!localStorage.myLibrary) {
        render();
    }
    else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
