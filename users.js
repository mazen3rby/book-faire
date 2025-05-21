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

// Load users when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (checkAdminAuth()) {
        loadUsers();
    }
});

// Load users from localStorage
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.isAdmin ? 'Admin' : 'User'}</td>
            <td>
                <button onclick="editUser('${user.email}')" class="edit-btn">Edit</button>
                <button onclick="deleteUser('${user.email}')" class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search users
function searchUsers() {
    const searchTerm = document.getElementById('searchUser').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
    );

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.isAdmin ? 'Admin' : 'User'}</td>
            <td>
                <button onclick="editUser('${user.email}')" class="edit-btn">Edit</button>
                <button onclick="deleteUser('${user.email}')" class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Show add user form
function showAddUserForm() {
    const name = prompt('Enter user name:');
    if (!name) return;

    const email = prompt('Enter user email:');
    if (!email) return;

    const password = prompt('Enter user password:');
    if (!password) return;

    const isAdmin = confirm('Is this user an admin?');

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }

    // Add new user
    users.push({
        name,
        email,
        password,
        isAdmin
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
    showNotification('User added successfully', 'success');
    loadUsers();
}

// Edit user
function editUser(email) {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showNotification('User not found', 'error');
        return;
    }

    const name = prompt('Enter new name:', user.name);
    if (!name) return;

    const isAdmin = confirm('Is this user an admin?');

    // Update user
    user.name = name;
    user.isAdmin = isAdmin;

    localStorage.setItem('registeredUsers', JSON.stringify(users));
    showNotification('User updated successfully', 'success');
    loadUsers();
}

// Delete user
function deleteUser(email) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = users.filter(user => user.email !== email);

    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    showNotification('User deleted successfully', 'success');
    loadUsers();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 