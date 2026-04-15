const search = document.getElementById("search");
const sortby = document.getElementById("sortby");
const ratingFilter = document.getElementById("rating-filter");
const bookSection = document.getElementById("books-section");
const clearFiltersButton = document.getElementById("clear-filters");

function clearFilters() {
  ratingFilter.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });
  search.value = "";
  sortby.value = "rating";
  loadBooks();
}

async function loadBooks() {
  const searchQuery = search.value;
  const sortByValue = sortby.value;
  const ratingValue = ratingFilter.querySelector("button.active")?.dataset.rating || "";
  const response = await fetch(`/books?search=${encodeURIComponent(searchQuery)}&sortby=${encodeURIComponent(sortByValue)}&rating=${encodeURIComponent(ratingValue)}`);
  const data = await response.json();
  renderBooks(data);
}

let debounceTimer;
search.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loadBooks();
  }, 300);
});

sortby.addEventListener("change", () => {
  loadBooks();
});

ratingFilter.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  const isAlreadyActive = e.target.classList.contains("active");
  ratingFilter.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (!isAlreadyActive) {
    e.target.classList.add("active");
  }

  loadBooks();
});

clearFiltersButton?.addEventListener("click", () => {
  clearFilters();
});

function renderBooks(books) {
  bookSection.innerHTML = "";

  if (books.length === 0) {
    bookSection.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">Search</div>
        <h2>No matching books</h2>
        <p>Try a different title, author, rating, or clear the filters to see everything again.</p>
        <a href="/addBook" class="empty-state-action">Add Book</a>
      </div>
    `;
    return;
  }

  let html = "";

  books.forEach((book) => {
    html += `
      <div class="book-card">
        <div class="icon">\u{1F4DA}</div>
        <h3 class="book-title1">${book.title}</h3>
        <p class="body-text">${book.author}</p>
        <p class="small-text">${new Date(book.date_read).toLocaleDateString("en-AU", { month: "short", year: "numeric" })}</p>
        <div class="rating-display">
          ${"&#11088;".repeat(book.rating)}${"&#9734;".repeat(5 - book.rating)}
        </div>
        <a href="/books/${book.id}" class="view-detail">View Details</a>
      </div>
    `;
  });

  bookSection.innerHTML = html;
}
