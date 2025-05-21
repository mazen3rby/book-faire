// Admin Dashboard JavaScript

// Initialize dashboard data
document.addEventListener('DOMContentLoaded', () => {
    if (checkAdminAuth()) {
        loadDashboardStats();
        setupEventListeners();
    }
});

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        // In a real application, these would be API calls
        const stats = {
            users: await getTotalUsers(),
            books: await getTotalBooks(),
            posts: await getTotalPosts(),
            messages: await getNewMessages()
        };

        // Update dashboard counters
        document.getElementById('userCount').textContent = stats.users;
        document.getElementById('bookCount').textContent = stats.books;
        document.getElementById('postCount').textContent = stats.posts;
        document.getElementById('messageCount').textContent = stats.messages;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        showNotification('Error loading dashboard data', 'error');
    }
}

// Mock API functions (replace with real API calls)
async function getTotalUsers() {
    // Simulate API call
    return 150;
}

async function getTotalBooks() {
    // Simulate API call
    return 500;
}

async function getTotalPosts() {
    // Simulate API call
    return 75;
}

async function getNewMessages() {
    // Simulate API call
    return 12;
}

// Setup event listeners for admin actions
function setupEventListeners() {
    // User management
    document.querySelector('a[href="users.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        if (checkAdminAuth()) {
            window.location.href = 'users.html';
        }
    });

    // Book management
    document.querySelector('a[href="books.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        if (checkAdminAuth()) {
            window.location.href = 'books.html';
        }
    });

    // Blog management
    document.querySelector('a[href="blog-management.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        if (checkAdminAuth()) {
            window.location.href = 'blog-management.html';
        }
    });

    // Message management
    document.querySelector('a[href="messages.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        if (checkAdminAuth()) {
            window.location.href = 'messages.html';
        }
    });
}

// Check admin authentication
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isAdmin) {
        showNotification('Access denied. Admin privileges required.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return false;
    }
    return true;
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    if (!checkAdminAuth()) {
        return;
    }

    // Show admin content
    const adminContent = document.getElementById('adminContent');
    const accessDenied = document.getElementById('accessDenied');
    
    if (adminContent && accessDenied) {
        adminContent.style.display = 'block';
        accessDenied.style.display = 'none';
    }

    // Add click handlers for admin cards
    const adminCards = document.querySelectorAll('.admin-card');
    adminCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!checkAdminAuth()) {
                return;
            }
        });
    });
});

// Handle logout
function handleAdminLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
} 