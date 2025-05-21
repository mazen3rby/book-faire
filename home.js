// Add default books
const defaultBooks = [
    {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 19.99,
        image: "./9781781109830.jpg",
        description: "The first book in the Harry Potter series, following the adventures of a young wizard and his friends at Hogwarts School of Witchcraft and Wizardry."
    },
    {
        id: 2,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        price: 24.99,
        image: "./9781781109854.jpg",
        description: "An epic high-fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord Sauron."
    },
    {
        id: 3,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        price: 14.99,
        image: "./9781781109878.jpg",
        description: "A classic novel about racial injustice and moral growth in the American South during the 1930s."
    }
];

// Always set the default books
localStorage.setItem('books', JSON.stringify(defaultBooks));

document.addEventListener('DOMContentLoaded', function() {
    // Get books from localStorage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    console.log('Books from localStorage:', books); // Debug log
    
    // Display featured books
    const bookList = document.querySelector('.book-list');
    if (bookList) {
        console.log('Book list element found'); // Debug log
        bookList.innerHTML = books.map(book => `
            <div class="book-card">
                <a href="book-details.html?id=${book.id}">
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p class="author">${book.author}</p>
                    <p class="price">$${book.price.toFixed(2)}</p>
                </a>
            </div>
        `).join('');
        console.log('Books HTML generated:', bookList.innerHTML); // Debug log
    } else {
        console.log('Book list element not found'); // Debug log
    }

    // Update navbar based on user login status
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminLink = document.querySelector('.admin-link');
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');

    if (currentUser) {
        if (currentUser.isAdmin) {
            adminLink.style.display = 'flex';
        }
        if (loginLink) loginLink.textContent = 'Logout';
        if (registerLink) registerLink.style.display = 'none';
    } else {
        if (adminLink) adminLink.style.display = 'none';
        if (loginLink) loginLink.textContent = 'Login';
        if (registerLink) registerLink.style.display = 'flex';
    }
}); 