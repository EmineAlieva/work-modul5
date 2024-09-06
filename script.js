const books = JSON.parse(localStorage.getItem('books')) || [];
const bookList = document.getElementById('bookList');

const selectGenre = document.querySelector('#filter #select_genre');
const selectStatus = document.querySelector('#filter #select_status');

const array_genre = books.map((item)=>{const book=item; return book.genre});
array_genre.forEach((item, index) => {
  if (array_genre.indexOf(item) === index) {
    selectGenre.innerHTML +=`
      <option>${item}</option>
    `;
  };
});

const array_status = books.map((item)=>{const book=item; return book.status});
array_status.forEach((item, index) => {
  if (array_status.indexOf(item) === index) {
    selectStatus.innerHTML +=`
      <option>${item}</option>
    `;
  };
});

selectGenre.addEventListener("mouseup", ()=>{
  displayBooks();
});
selectStatus.addEventListener("mouseup", ()=>{
  displayBooks();
});

const displayAll = document.querySelector('#filter button');
displayAll.addEventListener("click", ()=>{
  selectGenre.value = '';
  selectStatus.value = '';
  displayBooks();
});

function displayBook(book) {
  const bookNumber = books.indexOf(book);
  if ((selectGenre.value === book.genre || 
      selectGenre.value === '') && 
      (selectStatus.value === book.status || 
      selectStatus.value === '')) {
    bookList.innerHTML += `
    <div class="book">
      <div class="buttons">
        <button onclick="editBook(${bookNumber})" title='Изменить'>
          <span class="material-symbols-outlined">
          edit</span>
        </button>
        <button onclick="deleteBook(${bookNumber})" title='Удалить'>
          <span class="material-symbols-outlined">
          close</span>
        </button>
      </div>
      <h3>${book.title}</h3>
      <p>${book.autor}</p>
      <p>${book.year}</p>
      <p>${book.genre}</p>
      <p>${book.status}</p>
    </div>
    `;
  };
};

function displayBooks() {
  bookList.innerHTML = '';
  books.forEach(displayBook);
};
displayBooks();

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
};
saveBooks();

function addBook() {
  const book = {};
  book.title = document.getElementById('title').value;
  book.autor = document.getElementById('autor').value;
  book.year = document.getElementById('year').value;
  book.genre = document.getElementById('genre').value;
  book.status = document.getElementById('status').value;
  books.push(book);
  document.forms[0].reset();
  saveBooks();
  location.reload();
  return false;
};

function deleteBook(bookNumber) {
  books.splice(bookNumber, 1);
  saveBooks();
  location.reload();
};

function editBook(bookNumber) {
  const book = books[bookNumber];
  document.getElementById('title1').value=book.title;
  document.getElementById('autor1').value = book.autor;
  document.getElementById('year1').value = book.year;
  document.getElementById('genre1').value = book.genre;
  document.getElementById('status1').value = book.status;

  const edit = document.getElementById('editBook');
  edit.style.display='block';

  const button_close = document.querySelector('.button_close');
  button_close.addEventListener("click", () => {
    edit.style.display='none';
  });

  const btn = document.querySelector('.submit1');
  btn.onclick = function() {
    const edit_book = {};
    edit_book.title = document.getElementById('title1').value;
    edit_book.autor = document.getElementById('autor1').value;
    edit_book.year = document.getElementById('year1').value;
    edit_book.genre = document.getElementById('genre1').value;
    edit_book.status = document.getElementById('status1').value;
    books.splice(bookNumber, 1, edit_book);
    saveBooks();
    location.reload();
  };
  return false;
};

const list = document.getElementById('list');

function displayTitle(book) {
  const bookNumber = books.indexOf(book);
  list.innerHTML += `
    <ul>
      <li>${book.title} (${book.autor})</li>
    </ul>
  `;
};

function displayList() {
  list.innerHTML = '';
  books.forEach(displayTitle);
};
displayList();

const amount = document.getElementById('amount');
amount.textContent = `Сейчас в моей библиотеке количество книг: ${books.length}`;

const reload = document.querySelector('header button');
reload.addEventListener("click", ()=>{
  location.reload();
});

const clearAll = document.querySelector('footer button');
clearAll.addEventListener("click", ()=>{
  books.length = 0;
  saveBooks();
  location.reload();
})