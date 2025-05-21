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

// Load posts when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (checkAdminAuth()) {
        loadPosts();
    }
});

// Load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const tableBody = document.getElementById('postsTableBody');
    tableBody.innerHTML = '';

    posts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>${post.status}</td>
            <td>
                <button onclick="editPost('${post.id}')" class="edit-btn">Edit</button>
                <button onclick="deletePost('${post.id}')" class="delete-btn">Delete</button>
                <button onclick="togglePostStatus('${post.id}')" class="status-btn">
                    ${post.status === 'Published' ? 'Unpublish' : 'Publish'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search posts
function searchPosts() {
    const searchTerm = document.getElementById('searchPost').value.toLowerCase();
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const tableBody = document.getElementById('postsTableBody');
    tableBody.innerHTML = '';

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.author.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm)
    );

    filteredPosts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>${post.status}</td>
            <td>
                <button onclick="editPost('${post.id}')" class="edit-btn">Edit</button>
                <button onclick="deletePost('${post.id}')" class="delete-btn">Delete</button>
                <button onclick="togglePostStatus('${post.id}')" class="status-btn">
                    ${post.status === 'Published' ? 'Unpublish' : 'Publish'}
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Show add post form
function showAddPostForm() {
    const title = prompt('Enter post title:');
    if (!title) return;

    const content = prompt('Enter post content:');
    if (!content) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    // Add new post
    posts.push({
        id: Date.now().toString(),
        title,
        content,
        author: currentUser.name,
        date: new Date().toISOString(),
        status: 'Draft'
    });

    localStorage.setItem('blogPosts', JSON.stringify(posts));
    showNotification('Post added successfully', 'success');
    loadPosts();
}

// Edit post
function editPost(id) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        showNotification('Post not found', 'error');
        return;
    }

    const title = prompt('Enter new title:', post.title);
    if (!title) return;

    const content = prompt('Enter new content:', post.content);
    if (!content) return;

    // Update post
    post.title = title;
    post.content = content;
    post.date = new Date().toISOString();

    localStorage.setItem('blogPosts', JSON.stringify(posts));
    showNotification('Post updated successfully', 'success');
    loadPosts();
}

// Delete post
function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const updatedPosts = posts.filter(post => post.id !== id);

    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    showNotification('Post deleted successfully', 'success');
    loadPosts();
}

// Toggle post status
function togglePostStatus(id) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        showNotification('Post not found', 'error');
        return;
    }

    post.status = post.status === 'Published' ? 'Draft' : 'Published';
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    showNotification(`Post ${post.status.toLowerCase()} successfully`, 'success');
    loadPosts();
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