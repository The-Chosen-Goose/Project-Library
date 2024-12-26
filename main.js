function Book(name,author,pages,read){
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

let book1 = new Book('Pride and Prejudice','Jane Austen',259,true)
let book2 = new Book('The Catcher in the Rye','J. D. Salinger',234,false)

const mylibrary = []

function addBookToLibrary(book){
    mylibrary.push(book)
}


let openform = document.getElementById('openform')
let closebtn = document.getElementById('closebtn')
let overlay = document.getElementById('overlay')
let PopWindow = document.querySelector('.popup')
let savebook = document.getElementById('savebook')
let collection = document.querySelector('.collection')
let bookname = document.getElementById('bookname')
let bookauthor = document.getElementById('author')
let bookpages = document.getElementById('pages')
let readcheck = document.getElementById('read')
let logs = document.querySelector('.logs')

openform.onclick = function(){
    overlay.classList.add('active')
    PopWindow.classList.add('active')
}

closebtn.onclick = function(){
    overlay.classList.remove('active')
    PopWindow.classList.remove('active')
}

let readBooks = 0
let unreadBooks = 0

function bookcount(book){
    if(book.read == true ){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${++readBooks}`
    }
    else if(book.read == false){
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${++unreadBooks}`
    }
}

function removecount(book){
    logs.firstElementChild.textContent = `Total books : ${mylibrary.length}`
    if(book.read == true){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${--readBooks}`
    }
    else if(book.read == false){
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${--unreadBooks}`
    }
}

function updatecount(book){
    if(book.read == true && readBooks != 0){
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${--readBooks}`
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${++unreadBooks}`
    }
    else if(book.read == false && unreadBooks != 0){
        document.querySelector('.logs > :last-child').textContent = `Unread books : ${--unreadBooks}`
        document.querySelector('.logs > :nth-child(2)').textContent = `Read books : ${++readBooks}`
    }
}

function createbook(name,author,pages,read){
    let bookcard = document.createElement('div')
    bookcard.classList.add('books')
    collection.appendChild(bookcard)
    let book = new Book(name,author,pages,read)
    addBookToLibrary(book)

    let booktitle = document.createElement('p')
    let bookauthor = document.createElement('p')
    let bookpages = document.createElement('p')
    let read_check = document.createElement('button')
    let delete_btn = document.createElement('img')

    booktitle.innerHTML = book.name

    bookauthor.innerHTML = `By ${book.author}`;

    bookpages.innerHTML = `${book.pages} pages`

    read == true ? read_check.textContent = 'Read' : read_check.textContent = 'Not read';

    if(read == true){
        read_check.textContent = 'Read'
        read_check.classList.add('read')
        bookcount(book)
    }
    else {
        read_check.textContent = 'Not read'
        read_check.classList.add('unread')
        bookcount(book)
    }


    read_check.onclick = function(){
        if(book.read == true){
            updatecount(book)
            book.read = false
            read_check.textContent = 'Not read'
            read_check.classList.remove('read')
            read_check.classList.add('unread')
        }
        else if(book.read == false){
            updatecount(book)
            book.read = true
            read_check.textContent = 'Read'
            read_check.classList.remove('unread')
            read_check.classList.add('read')
        }
    }

    delete_btn.src = 'https://www.svgrepo.com/show/459913/delete-alt.svg'

    delete_btn.onclick = function(){
        collection.removeChild(bookcard)
        mylibrary.splice(mylibrary.indexOf(book),1)
        removecount(book)
    } 
                                     
    bookcard.append(booktitle,bookauthor,bookpages,read_check,delete_btn)
    logs.firstElementChild.textContent = `Total books : ${mylibrary.length}`
}

createbook(book1.name,book1.author,book1.pages,book1.read)
createbook(book2.name,book2.author,book2.pages,book2.read)

savebook.onclick = function(){
    if((bookname.value && author.value && pages.value) != ''){
        createbook(bookname.value,author.value,pages.value,read.checked)
        bookcount(read.checked)
        overlay.classList.remove('active')
        PopWindow.classList.remove('active')
        bookname.value = ''
        author.value = ''
        pages.value = ''
        readcheck.checked = false
    }
}


document.querySelector('.footer > :first-child > img').onclick = function(){
    window.open('https://github.com/The-Chosen-Goose/Project-Library','_blank')
}