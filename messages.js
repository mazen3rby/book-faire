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

// Load messages when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (checkAdminAuth()) {
        loadMessages();
    }
});

// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const tableBody = document.getElementById('messagesTableBody');
    tableBody.innerHTML = '';

    messages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.from}</td>
            <td>${message.subject}</td>
            <td>${new Date(message.date).toLocaleDateString()}</td>
            <td>${message.status}</td>
            <td>
                <button onclick="viewMessage('${message.id}')" class="view-btn">View</button>
                <button onclick="deleteMessage('${message.id}')" class="delete-btn">Delete</button>
                <button onclick="toggleMessageStatus('${message.id}')" class="status-btn">
                    ${message.status === 'Read' ? 'Mark as Unread' : 'Mark as Read'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search messages
function searchMessages() {
    const searchTerm = document.getElementById('searchMessage').value.toLowerCase();
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const tableBody = document.getElementById('messagesTableBody');
    tableBody.innerHTML = '';

    const filteredMessages = messages.filter(message => 
        message.from.toLowerCase().includes(searchTerm) || 
        message.subject.toLowerCase().includes(searchTerm) ||
        message.content.toLowerCase().includes(searchTerm)
    );

    filteredMessages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.from}</td>
            <td>${message.subject}</td>
            <td>${new Date(message.date).toLocaleDateString()}</td>
            <td>${message.status}</td>
            <td>
                <button onclick="viewMessage('${message.id}')" class="view-btn">View</button>
                <button onclick="deleteMessage('${message.id}')" class="delete-btn">Delete</button>
                <button onclick="toggleMessageStatus('${message.id}')" class="status-btn">
                    ${message.status === 'Read' ? 'Mark as Unread' : 'Mark as Read'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// View message
function viewMessage(id) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const message = messages.find(m => m.id === id);
    
    if (!message) {
        showNotification('Message not found', 'error');
        return;
    }

    // Mark as read when viewing
    message.status = 'Read';
    localStorage.setItem('messages', JSON.stringify(messages));

    // Show message content
    alert(`
        From: ${message.from}
        Subject: ${message.subject}
        Date: ${new Date(message.date).toLocaleDateString()}
        
        Message:
        ${message.content}
    `);

    loadMessages();
}

// Delete message
function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = messages.filter(message => message.id !== id);

    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    showNotification('Message deleted successfully', 'success');
    loadMessages();
}

// Toggle message status
function toggleMessageStatus(id) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const message = messages.find(m => m.id === id);
    
    if (!message) {
        showNotification('Message not found', 'error');
        return;
    }

    message.status = message.status === 'Read' ? 'Unread' : 'Read';
    localStorage.setItem('messages', JSON.stringify(messages));
    showNotification(`Message marked as ${message.status.toLowerCase()}`, 'success');
    loadMessages();
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