let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Register or login a user
function registerOrLogin() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    currentUser = users.find(user => user.username === username) || registerNewUser(username);
    localStorage.setItem('currentUser', currentUser.username);
    document.getElementById('current-user').textContent = currentUser.username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';

    loadUserList();
    loadFeed();
}

// Register a new user and save to localStorage
function registerNewUser(username) {
    const newUser = { username, following: [], followers: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

// Log out the current user
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
}

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value.trim();
    const imageInput = document.getElementById('post-image');
    const imageFile = imageInput.files[0];

    if (!content && !imageFile) {
        alert("Post content or image cannot be empty.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const post = {
            content,
            author: currentUser.username,
            likes: 0,
            dislikes: 0,
            comments: [],
            timestamp: new Date().toLocaleString(),
            image: event.target.result
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        clearPostInputs();
        loadFeed();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const post = { content, author: currentUser.username, likes: 0, dislikes: 0, comments: [], timestamp: new Date().toLocaleString(), image: '' };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        clearPostInputs();
        loadFeed();
    }
}

// Clear post inputs
function clearPostInputs() {
    document.getElementById('post-content').value = '';
    document.getElementById('post-image').value = '';
}

// Load the feed of posts from followed users
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    let followedPosts = posts.filter(post => currentUser.following.includes(post.author) || post.author === currentUser.username);
    followedPosts.forEach(createPostElement);
}

// Create and append post elements to the feed
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post', 'feed-item');

    postDiv.innerHTML = `
        <div class="feed-content">
            <strong>${post.author}</strong><br>
            <span>${post.content}</span><br>
            <span class="timestamp">${post.timestamp}</span><br>
        </div>
        <span>Likes: <span class="red-heart">${post.likes} ❤️</span></span>
        <span>Dislikes: <span class="red-heart">${post.dislikes} 💔</span></span><br>
    `;

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.style.width = '100%';
        img.style.borderRadius = '5px';
        postDiv.appendChild(img);
    }

    // Event listeners for likes and dislikes
    postDiv.querySelector('.red-heart').onclick = () => updateLikes(post);
    postDiv.querySelector('.red-heart').onclick = () => updateDislikes(post);
    
    // Comment section
    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = '<i class="fa fa-comments"></i> Comment';
    commentBtn.classList.add('comment-btn');
    commentBtn.onclick = () => addComment(post);
    postDiv.appendChild(commentBtn);

    // Display comments
    post.comments.forEach(createCommentElement.bind(null, postDiv));
    feed.appendChild(postDiv);
}

// Update likes count
function updateLikes(post) {
    post.likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed();
}

// Update dislikes count
function updateDislikes(post) {
    post.dislikes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed();
}

// Add a comment to a post
function addComment(post) {
    const commentText = prompt("Add your comment:");
    if (commentText) {
        const comment = {
            author: currentUser.username,
            comment: commentText,
            likes: 0,
            dislikes: 0,
            timestamp: new Date().toLocaleString()
        };
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadFeed();
    }
}

// Create and append comment elements
function createCommentElement(postDiv, comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <strong>${comment.author}</strong>: ${comment.comment} 
        <span class="timestamp">${comment.timestamp}</span><br>
        Likes: <span class="red-heart">${comment.likes} ❤️</span>
        Dislikes: <span class="red-heart">${comment.dislikes} 💔</span>
    `;

    commentDiv.querySelector('.red-heart').onclick = () => updateCommentLikes(comment);
    commentDiv.querySelector('.red-heart').onclick = () => updateCommentDislikes(comment);
    postDiv.appendChild(commentDiv);
}

// Update likes for comments
function updateCommentLikes(comment) {
    comment.likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed();
}

// Update dislikes for comments
function updateCommentDislikes(comment) {
    comment.dislikes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed();
}

// Load users for following/unfollowing
function loadUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        if (user.username !== currentUser.username) {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `<strong>${user.username}</strong>`;

            const followBtn = createFollowButton(user);
            userDiv.appendChild(followBtn);
            userList.appendChild(userDiv);
        }
    });
}

// Create follow/unfollow button
function createFollowButton(user) {
    const followBtn = document.createElement('button');
    const isFollowing = currentUser.following.includes(user.username);
    followBtn.innerHTML = isFollowing ? '<i class="fa fa-user-times"></i> Unfollow' : '<i class="fa fa-user-plus"></i> Follow';
    followBtn.classList.add('follow-btn');
    followBtn.onclick = () => toggleFollow(user, isFollowing);
    return followBtn;
}

// Toggle follow/unfollow action
function toggleFollow(user, isFollowing) {
    if (isFollowing) {
        currentUser.following = currentUser.following.filter(f => f !== user.username);
        user.followers = user.followers.filter(f => f !== currentUser.username);
    } else {
        currentUser.following.push(user.username);
        user.followers.push(currentUser.username);
    }
    localStorage.setItem('users', JSON.stringify(users));
    loadUserList();
    loadFeed();
}

// Load existing data on page load
document.addEventListener('DOMContentLoaded', function() {
    if (users.length > 0) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = users.find(user => user.username === savedUser);
            document.getElementById('current-user').textContent = currentUser.username;
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('user-section').style.display = 'block';
            loadUserList();
            loadFeed();
        }
    }
});
