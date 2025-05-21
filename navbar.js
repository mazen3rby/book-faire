// Function to update navbar based on user role
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminLink = document.querySelector('.admin-link');
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');
    
    if (currentUser) {
        // User is logged in
        if (adminLink) {
            adminLink.style.display = 'block';
        }
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.onclick = handleLogout;
        }
        if (registerLink) {
            registerLink.parentElement.style.display = 'none';
        }
    } else {
        // User is not logged in
        if (adminLink) {
            adminLink.style.display = 'block';
        }
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginLink.onclick = null;
        }
        if (registerLink) {
            registerLink.parentElement.style.display = 'flex';
        }
    }
}

// Function to handle logout
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

// Function to show notifications
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Don't update navbar on login page
    if (!window.location.pathname.includes('login.html')) {
        updateNavbar();
    }

    // Initialize language
    let currentLang = localStorage.getItem('language') || 'en';
    updateLanguage(currentLang);

    // Add click event to language toggle button
    document.getElementById('langToggle').addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang);
    });
});

// Update navbar when storage changes
window.addEventListener('storage', (event) => {
    if (event.key === 'currentUser') {
        updateNavbar();
    }
});

function updateLanguage(lang) {
    // Update language button text
    document.querySelector('.current-lang').textContent = lang.toUpperCase();
    
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (TRANSLATIONS[lang][key]) {
            element.textContent = TRANSLATIONS[lang][key];
        }
    });
} 