document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
});

async function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value; // Get user type

    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    try {
        const success = await registerUser(name, email, password, userType);
        
        if (success) {
            showNotification('Registration successful! Please login.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showNotification('Email already registered', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Error during registration', 'error');
    }
}

async function registerUser(name, email, password, userType) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get existing users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Check if email already exists
    if (registeredUsers.some(user => user.email === email)) {
        return false;
    }

    // Create new user
    const newUser = {
        name,
        email,
        password,
        isAdmin: userType === 'admin', // Set admin status based on user type
        registrationDate: new Date().toISOString()
    };

    // Add to registered users
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

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
  