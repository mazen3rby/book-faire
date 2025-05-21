// Check if user is admin
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'login.html';
    }
}

// Show add book form
function showAddBookForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add New Book</h2>
            <form id="addBookForm">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="author">Author:</label>
                    <input type="text" id="author" name="author" required>
                </div>
                <div class="form-group">
                    <label for="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="image">Image URL:</label>
                    <input type="url" id="image" name="image" required>
                </div>
                <button type="submit" class="submit-btn">Add Book</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking the X
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.remove();
        }
    }

    // Handle form submission
    const form = document.getElementById('addBookForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const book = {
            id: Date.now(),
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            createdAt: new Date().toISOString()
        };

        // Get existing books or initialize empty array
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

        // Show success message
        showNotification('Book added successfully!', 'success');
        
        // Close modal and refresh table
        modal.remove();
        loadBooks();
    }
}

// Load books into table
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';

    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>
                <button onclick="editBook(${book.id})" class="edit-btn">Edit</button>
                <button onclick="deleteBook(${book.id})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Search books
function searchBooks() {
    const searchTerm = document.getElementById('searchBook').value.toLowerCase();
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';

    filteredBooks.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>$${book.price.toFixed(2)}</td>
            <td>
                <button onclick="editBook(${book.id})" class="edit-btn">Edit</button>
                <button onclick="deleteBook(${book.id})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit book
function editBook(id) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === id);
    if (!book) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Book</h2>
            <form id="editBookForm">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value="${book.title}" required>
                </div>
                <div class="form-group">
                    <label for="author">Author:</label>
                    <input type="text" id="author" name="author" value="${book.author}" required>
                </div>
                <div class="form-group">
                    <label for="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="Fiction" ${book.category === 'Fiction' ? 'selected' : ''}>Fiction</option>
                        <option value="Non-Fiction" ${book.category === 'Non-Fiction' ? 'selected' : ''}>Non-Fiction</option>
                        <option value="Science" ${book.category === 'Science' ? 'selected' : ''}>Science</option>
                        <option value="History" ${book.category === 'History' ? 'selected' : ''}>History</option>
                        <option value="Biography" ${book.category === 'Biography' ? 'selected' : ''}>Biography</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" value="${book.price}" required>
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required>${book.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="image">Image URL:</label>
                    <input type="url" id="image" name="image" value="${book.image}" required>
                </div>
                <button type="submit" class="submit-btn">Update Book</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking the X
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.remove();
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.remove();
        }
    }

    // Handle form submission
    const form = document.getElementById('editBookForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const updatedBook = {
            ...book,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            updatedAt: new Date().toISOString()
        };

        const bookIndex = books.findIndex(b => b.id === id);
        books[bookIndex] = updatedBook;
        localStorage.setItem('books', JSON.stringify(books));

        showNotification('Book updated successfully!', 'success');
        modal.remove();
        loadBooks();
    }
}

// Delete book
function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
        
        showNotification('Book deleted successfully!', 'success');
        loadBooks();
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    loadBooks();
}); 