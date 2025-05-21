// Default books data
const defaultBooks = {
    1: {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 19.99,
        image: "./9781781109830.jpg",
        description: "The first book in the Harry Potter series, following the adventures of a young wizard and his friends at Hogwarts School of Witchcraft and Wizardry."
    },
    2: {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        price: 24.99,
        image: "./9781781109854.jpg",
        description: "An epic high-fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord Sauron."
    },
    3: {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        price: 14.99,
        image: "./9781781109878.jpg",
        description: "A classic novel about racial injustice and moral growth in the American South during the 1930s."
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (bookId && defaultBooks[bookId]) {
        const book = defaultBooks[bookId];
        
        // Update page title
        document.title = `${book.title} - Book Fair & Literature`;

        // Update book details
        document.getElementById('bookImage').src = book.image;
        document.getElementById('bookImage').alt = book.title;
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('bookAuthor').textContent = book.author;
        document.getElementById('bookCategory').textContent = book.category;
        document.getElementById('bookPrice').textContent = `$${book.price.toFixed(2)}`;
        document.getElementById('bookDescription').textContent = book.description;

        // Check if book is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistButton = document.querySelector('.add-to-wishlist');
        if (wishlist.includes(parseInt(bookId))) {
            wishlistButton.classList.add('in-wishlist');
            wishlistButton.innerHTML = `<i class="fas fa-heart"></i> ${TRANSLATIONS[localStorage.getItem('language') || 'en'].alreadyInWishlist}`;
        }
    } else {
        showError(TRANSLATIONS[localStorage.getItem('language') || 'en'].bookNotFound);
    }
});

function showError(message) {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="error-message">
            <h2>${TRANSLATIONS[localStorage.getItem('language') || 'en'].error}</h2>
            <p>${message}</p>
            <a href="home.html" class="back-button">${TRANSLATIONS[localStorage.getItem('language') || 'en'].backToHome}</a>
        </div>
    `;
}

// Add to wishlist functionality
document.querySelector('.add-to-wishlist').addEventListener('click', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showNotification(TRANSLATIONS[localStorage.getItem('language') || 'en'].loginRequired, 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }

    // Get book ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Add or remove book from wishlist
    const wishlistButton = document.querySelector('.add-to-wishlist');
    if (!wishlist.includes(parseInt(bookId))) {
        wishlist.push(parseInt(bookId));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        wishlistButton.classList.add('in-wishlist');
        wishlistButton.innerHTML = `<i class="fas fa-heart"></i> ${TRANSLATIONS[localStorage.getItem('language') || 'en'].alreadyInWishlist}`;
        showNotification(TRANSLATIONS[localStorage.getItem('language') || 'en'].addedToWishlist, 'success');
    } else {
        wishlist = wishlist.filter(id => id !== parseInt(bookId));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        wishlistButton.classList.remove('in-wishlist');
        wishlistButton.innerHTML = `<i class="fas fa-heart"></i> ${TRANSLATIONS[localStorage.getItem('language') || 'en'].addToWishlist}`;
        showNotification(TRANSLATIONS[localStorage.getItem('language') || 'en'].removedFromWishlist, 'success');
    }
});

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