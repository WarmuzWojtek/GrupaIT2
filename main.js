document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const priorityInput = document.getElementById("priority");
  const categoryInput = document.getElementById("category");
  const submitBtn = document.getElementById("submitBtn");

  let books = JSON.parse(localStorage.getItem("myBooks")) || [];

  const printBooks = (books) => {
    const shelfContainer = document.getElementById("shelfContainer");
    shelfContainer.innerHTML = "";
    books.map((book, index) => {
      const shelf = document.createElement("tr");
      const lp = document.createElement("th");
      lp.setAttribute("scope", "row");
      lp.textContent = index + 1 + ".";
      shelf.appendChild(lp);
      const title = document.createElement("th");
      title.textContent = book.title;
      shelf.appendChild(title);
      const author = document.createElement("th");
      author.textContent = book.author;
      shelf.appendChild(author);
      const priority = document.createElement("th");
      priority.textContent = book.priority;
      shelf.appendChild(priority);
      const category = document.createElement("th");
      category.textContent = book.category;
      shelf.appendChild(category);

      shelfContainer.appendChild(shelf);
    });
  };

  printBooks(books);

  submitBtn.addEventListener("click", addBook);

  function addBook(e) {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;
    const isFormValidate = formValidation();
    if (isFormValidate) {
      let newBook = {
        title,
        author,
        priority,
        category,
      };
      books.push(newBook);
      titleInput.value = "";
      authorInput.value = "";
      priorityInput.value = "Wybierz priorytet przeczytania";
      categoryInput.value = "Wybierz kategorię";
      localStorage.setItem("myBooks", JSON.stringify(books));
      printBooks(books);
      deleteBook();
    }
  }

  function formValidation() {
    const title = titleInput.value;
    const author = authorInput.value;
    if (!title) {
      alert("Wpisz tytuł książki!");
      return false;
    } else if (author.length < 3) {
      alert("Pole Autor musi się skłądć z conajmniej 3 znaków!");
      return false;
    } else return true;
  }

  function deleteBook() {
    const currentRows = document.querySelectorAll("tbody>tr");
    currentRows.forEach((row, index) => {
      row.addEventListener("click", () => {
        books.splice(index, 1);
        localStorage.setItem("myBooks", JSON.stringify(books));
        printBooks(books);
        deleteBook();
      });
    });
  }

  deleteBook();
});
