/* eslint max-classes-per-file: ["error", 3] */
import Books from './book.js';
import Store from './store.js';
import { DateTime } from './luxon.js';

class task {
  static currentBooks() {
    const books = Store.getBooks();
    books.forEach((book) => task.addBookList(book));
  }

  static addBookList(book) {
    const list = document.querySelector('#list-book');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
      <td>${book.author}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">REMOVE</a></td>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.firstContainer');
    const navigation = document.querySelector('.navigation');
    container.insertBefore(div, navigation);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

const listBook = document.getElementById('listBooks');
const newBook = document.getElementById('newBooks');
const contact = document.getElementById('contact');
const navItems = [listBook, newBook, contact];
const listSection = document.getElementById('list-section');
const addSection = document.getElementById('add-section');
const contactSection = document.getElementById('contact-section');
const sections = [listSection, addSection, contactSection];

function saveActiveNavItemLocally(id) {
  localStorage.setItem('activeNavItem', id);
}

document.addEventListener('DOMContentLoaded', task.currentBooks);
document.querySelector('#book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title === '' || author === '') {
    task.showAlert('fill in all the fields');
  } else {
    const book = new Books(title, author);
    task.addBookList(book);
    Store.addBook(book);
    task.showAlert('Book added', 'success');
    task.clearField();
  }
});

document.querySelector('#list-book').addEventListener('click', (e) => {
  task.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  task.showAlert('Book Removed');
});

function displaySection(id) {
  sections.forEach((section) => {
    if (section.id === id) {
      section.classList.remove('d-none');
    } else {
      section.classList.add('d-none');
    }
  });
}

function activateNavItem(id) {
  navItems.forEach((navItem) => {
    if (navItem.id === id) {
      navItem.classList.add('li-active');
    } else {
      navItem.classList.remove('li-active');
    }
  });
}

listBook.addEventListener('click', () => {
  displaySection(listSection.id);
  activateNavItem(listBook.id);
  saveActiveNavItemLocally(listBook.id);
});
newBook.addEventListener('click', () => {
  displaySection(addSection.id);
  activateNavItem(newBook.id);
  saveActiveNavItemLocally(newBook.id);
});
contact.addEventListener('click', () => {
  displaySection(contactSection.id);
  activateNavItem(contact.id);
  saveActiveNavItemLocally(contact.id);
});

setInterval(() => {
  const date = DateTime.now();
  const dateToday = document.getElementById('myTime');
  dateToday.innerHTML = date.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
}, 1000);