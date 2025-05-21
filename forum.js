// Forum JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadForumPosts();
    setupForumEventListeners();
});

// Load forum posts
async function loadForumPosts() {
    try {
        const posts = await getForumPosts();
        displayForumPosts(posts);
    } catch (error) {
        console.error('Error loading forum posts:', error);
        showNotification('Error loading forum posts', 'error');
    }
}

// Display forum posts
function displayForumPosts(posts) {
    const forumSection = document.querySelector('.forum-section');
    const postsContainer = document.createElement('div');
    postsContainer.className = 'forum-posts-container';

    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });

    // Add new post button
    const newPostButton = document.createElement('button');
    newPostButton.className = 'new-post-button';
    newPostButton.textContent = 'Create New Post';
    newPostButton.addEventListener('click', showNewPostForm);
    
    forumSection.appendChild(postsContainer);
    forumSection.appendChild(newPostButton);
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'forum-post';
    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p class="author">Posted by: ${post.author} | ${post.date}</p>
        <p>${post.content}</p>
        <div class="post-actions">
            <button class="reply-btn" data-post-id="${post.id}">Reply</button>
            ${isAdmin() ? `
                <button class="edit-btn" data-post-id="${post.id}">Edit</button>
                <button class="delete-btn" data-post-id="${post.id}">Delete</button>
            ` : ''}
        </div>
        <div class="replies" id="replies-${post.id}"></div>
    `;
    return postDiv;
}

// Show new post form
function showNewPostForm() {
    const form = document.createElement('div');
    form.className = 'new-post-form';
    form.innerHTML = `
        <h3>Create New Post</h3>
        <form id="newPostForm">
            <input type="text" placeholder="Title" required>
            <textarea placeholder="Your post content" required></textarea>
            <button type="submit">Post</button>
            <button type="button" class="cancel-btn">Cancel</button>
        </form>
    `;

    document.querySelector('.forum-section').appendChild(form);
    setupNewPostFormListeners(form);
}

// Setup event listeners for forum functionality
function setupForumEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('reply-btn')) {
            const postId = e.target.dataset.postId;
            showReplyForm(postId);
        }
        if (e.target.classList.contains('edit-btn')) {
            const postId = e.target.dataset.postId;
            editPost(postId);
        }
        if (e.target.classList.contains('delete-btn')) {
            const postId = e.target.dataset.postId;
            deletePost(postId);
        }
    });
}

// Show reply form
function showReplyForm(postId) {
    const repliesContainer = document.getElementById(`replies-${postId}`);
    const replyForm = document.createElement('div');
    replyForm.className = 'reply-form';
    replyForm.innerHTML = `
        <textarea placeholder="Write your reply..." required></textarea>
        <button class="submit-reply">Submit Reply</button>
        <button class="cancel-reply">Cancel</button>
    `;
    repliesContainer.appendChild(replyForm);
    setupReplyFormListeners(replyForm, postId);
}

// Mock API functions (replace with real API calls)
async function getForumPosts() {
    // Simulate API call
    return [
        {
            id: 1,
            title: "What's your favorite novel of all time?",
            author: "Nour Ahmed",
            date: "May 11, 2025",
            content: "I've been reading a lot lately, but I keep going back to the classics. What's a novel you could read over and over?"
        },
        {
            id: 2,
            title: "Looking for Arabic historical fiction recommendations",
            author: "Omar El-Sayed",
            date: "May 10, 2025",
            content: "Anyone know good Arabic novels set in ancient Egypt or Islamic history? I'm especially into literature that blends fact and fiction."
        }
    ];
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

// Post management functions
async function editPost(postId) {
    // Implement edit functionality
    showNotification('Edit functionality coming soon', 'info');
}

async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            // Implement delete functionality
            showNotification('Post deleted successfully', 'success');
            loadForumPosts(); // Reload posts
        } catch (error) {
            showNotification('Error deleting post', 'error');
        }
    }
}

// Setup form listeners
function setupNewPostFormListeners(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const cancelBtn = form.querySelector('.cancel-btn');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const title = form.querySelector('input').value;
        const content = form.querySelector('textarea').value;
        
        try {
            // Implement post creation
            showNotification('Post created successfully', 'success');
            form.remove();
            loadForumPosts(); // Reload posts
        } catch (error) {
            showNotification('Error creating post', 'error');
        }
    });

    cancelBtn.addEventListener('click', () => {
        form.remove();
    });
}

function setupReplyFormListeners(form, postId) {
    const submitBtn = form.querySelector('.submit-reply');
    const cancelBtn = form.querySelector('.cancel-reply');

    submitBtn.addEventListener('click', async () => {
        const content = form.querySelector('textarea').value;
        
        try {
            // Implement reply creation
            showNotification('Reply posted successfully', 'success');
            form.remove();
            loadForumPosts(); // Reload posts
        } catch (error) {
            showNotification('Error posting reply', 'error');
        }
    });

    cancelBtn.addEventListener('click', () => {
        form.remove();
    });
} 