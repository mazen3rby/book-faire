// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Find user by email
    const user = registeredUsers.find(u => u.email === email);

    if (user && user.password === password) {
        // Store user info in localStorage
        const userInfo = {
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        };
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        
        // Show success message
        showNotification('Login successful!', 'success');
        
        // Redirect based on user role
        setTimeout(() => {
            if (user.isAdmin) {
                window.location.href = 'Admin.html';
            } else {
                window.location.href = 'home.html';
            }
        }, 1000);
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Authentication function that checks registered users
async function authenticateUser(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Find user with matching email and password
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin || false
        };
    }
    
    return null;
}

// Utility function to show notifications
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
