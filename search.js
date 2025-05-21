document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultsSection = document.querySelector(".search-results");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const query = form.query.value.trim().toLowerCase();
  
      // مسح النتائج السابقة
      resultsSection.innerHTML = "<h3>Results:</h3>";
  
      // قراءة الكتب المخزنة في localStorage
      const books = JSON.parse(localStorage.getItem("books")) || [];
  
      // فلترة الكتب حسب العنوان أو المؤلف أو الكلمة المفتاحية
      const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );
  
      if (filteredBooks.length === 0) {
        resultsSection.innerHTML += "<p>No matching books found.</p>";
      } else {
        filteredBooks.forEach(book => {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("book-result");
          bookDiv.innerHTML = `
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Description: ${book.description}</p>
          `;
          resultsSection.appendChild(bookDiv);
        });
      }
    });

  });
  