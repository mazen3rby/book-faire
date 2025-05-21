// Common configuration
const CONFIG = {
    // API endpoints
    API: {
        BOOKS: '/api/books',
        USERS: '/api/users',
        BLOG: '/api/blog',
        FORUM: '/api/forum'
    },

    // Local storage keys
    STORAGE_KEYS: {
        CURRENT_USER: 'currentUser',
        BOOKS: 'books',
        CART: 'cart',
        WISHLIST: 'wishlist',
        USERS: 'users'
    },

    // User roles
    ROLES: {
        ADMIN: 'admin',
        USER: 'user'
    },

    // Default values
    DEFAULTS: {
        BOOKS_PER_PAGE: 10,
        MAX_CART_ITEMS: 20,
        MAX_WISHLIST_ITEMS: 50
    },

    // Messages
    MESSAGES: {
        LOGIN_REQUIRED: 'Please login to continue',
        SUCCESS: 'Operation completed successfully',
        ERROR: 'An error occurred',
        NOT_FOUND: 'Item not found'
    }
}; 