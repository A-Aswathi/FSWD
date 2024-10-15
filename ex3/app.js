let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Load existing data on page load
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = users.find(user => user.username === savedUser);
        if (currentUser) {
            document.getElementById('current-user').textContent = currentUser.username;
            toggleAuthSection(false);
            loadUserList();
            loadFeed();
        }
    } else {
        toggleAuthSection(true);
    }
};

// Register or login a user
function registerOrLogin() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    let user = users.find(user => user.username === username);
    if (!user) {
        user = { username, following: [], followers: [] };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    currentUser = user;
    localStorage.setItem('currentUser', currentUser.username);
    document.getElementById('current-user').textContent = currentUser.username;
    toggleAuthSection(false);
    loadUserList();
    loadFeed();
}

// Toggle the visibility of the authentication section
function toggleAuthSection(isAuthVisible) {
    document.getElementById('auth-section').style.display = isAuthVisible ? 'block' : 'none';
    document.getElementById('user-section').style.display = isAuthVisible ? 'none' : 'block';
}

// Log out the current user
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    toggleAuthSection(true);
}

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value.trim();
    const imageInput = document.getElementById('post-image');
    const imageFile = imageInput.files[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    if (!content && !imageUrl) {
        alert("Post content or image cannot be empty.");
        return;
    }

    const post = {
        content,
        author: currentUser.username,
        likes: 0,
        dislikes: 0,
        comments: [],
        timestamp: new Date().toLocaleString(),
        image: imageUrl
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    resetPostInput();
    loadFeed();
}

// Reset post input fields
function resetPostInput() {
    document.getElementById('post-content').value = '';
    document.getElementById('post-image').value = '';
}

// Load the feed of posts from followed users
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    let followedPosts = posts.filter(post => 
        currentUser.following.includes(post.author) || post.author === currentUser.username
    );

    followedPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post', 'feed-item');

        postDiv.innerHTML = `
            <div class="feed-content">
                <strong>${post.author}</strong><br>
                <span class="timestamp">${post.timestamp}</span><br>
                <span>${post.content}</span><br>
            </div>
            <span>Likes: <span class="red-heart">${post.likes} ❤️</span></span>
            <span>Dislikes: <span class="brown-thumb">${post.dislikes} 👎</span></span><br>
            <span>Comments: ${post.comments.length}</span><br>
        `;

        if (post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            img.style.width = '100%';
            img.style.borderRadius = '5px';
            postDiv.appendChild(img);
        }

        addPostInteractions(post, postDiv);
        feed.appendChild(postDiv);
    });
}

// Add interactions for liking, disliking, and commenting
function addPostInteractions(post, postDiv) {
    const likeSpan = postDiv.querySelector('.red-heart');
    const dislikeSpan = postDiv.querySelector('.brown-thumb');

    likeSpan.onclick = () => updatePostReactions(post, 'like');
    dislikeSpan.onclick = () => updatePostReactions(post, 'dislike');

    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = `<i class="fa fa-comments"></i> Comment`;
    commentBtn.classList.add('comment-btn');
    commentBtn.onclick = () => addComment(post);
    postDiv.appendChild(commentBtn);

    displayComments(post, postDiv);
}

// Update post reactions
function updatePostReactions(post, type) {
    if (type === 'like') {
        post.likes++;
    } else if (type === 'dislike') {
        post.dislikes++;
    }
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
            timestamp: new Date().toLocaleString(),
            reactions: []
        };
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadFeed();
    }
}

// Display comments for a post
function displayComments(post, postDiv) {
    post.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <strong>${comment.author}</strong>: ${comment.comment} 
            <span class="timestamp">${comment.timestamp}</span><br>
            Likes: <span class="red-heart">${comment.likes} ❤️</span>
            Dislikes: <span class="brown-thumb">${comment.dislikes} 👎</span>
            <button class="reaction-btn">React 😊</button>
            <div class="reactions" style="display:none;"></div>
        `;

        const likeCommentSpan = commentDiv.querySelector('.red-heart');
        const dislikeCommentSpan = commentDiv.querySelector('.brown-thumb');

        likeCommentSpan.onclick = () => updateCommentReactions(comment, 'like');
        dislikeCommentSpan.onclick = () => updateCommentReactions(comment, 'dislike');

        const reactionBtn = commentDiv.querySelector('.reaction-btn');
        const reactionsDiv = commentDiv.querySelector('.reactions');
        reactionBtn.onclick = () => reactionsDiv.style.display = reactionsDiv.style.display === 'none' ? 'block' : 'none';

        addEmojiReactions(comment, reactionsDiv);
        commentDiv.appendChild(reactionsDiv);
        postDiv.appendChild(commentDiv);
    });
}

// Update comment reactions
function updateCommentReactions(comment, type) {
    if (type === 'like') {
        comment.likes++;
    } else if (type === 'dislike') {
        comment.dislikes++;
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    loadFeed();
}

// Add emoji reactions to a comment
function addEmojiReactions(comment, reactionsDiv) {
    const emojiList = ['😊', '😂', '😢', '❤️', '😮'];
    emojiList.forEach(emoji => {
        const emojiButton = document.createElement('span');
        emojiButton.textContent = emoji;
        emojiButton.style.cursor = 'pointer';
        emojiButton.style.margin = '0 5px';
        emojiButton.onclick = () => {
            const reaction = {
                emoji,
                author: currentUser.username,
                timestamp: new Date().toLocaleString(),
            };
            comment.reactions.push(reaction);
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };
        reactionsDiv.appendChild(emojiButton);
    });

    // Display existing reactions
    if (comment.reactions) {
        comment.reactions.forEach(reaction => {
            const reactionDiv = document.createElement('div');
            reactionDiv.innerHTML = `<strong>${reaction.author}</strong> reacted with ${reaction.emoji} <span class="timestamp">${reaction.timestamp}</span>`;
            reactionsDiv.appendChild(reactionDiv);
        });
    }
}

// Load users for following/unfollowing
function loadUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        if (user.username !== currentUser.username) {
            const userDiv = document.createElement('div');
            const isFollowing = currentUser.following.includes(user.username);
            userDiv.innerHTML = `<strong>${user.username}</strong>`;

            const followBtn = document.createElement('button');
            followBtn.innerHTML = isFollowing ? `<i class="fa fa-user-times"></i> Unfollow` : `<i class="fa fa-user-plus"></i> Follow`;
            followBtn.classList.add('follow-btn');
            followBtn.onclick = () => {
                toggleFollow(user, isFollowing);
                alert(`${isFollowing ? 'Unfollowed' : 'Followed'} ${user.username}`);
            };

            userDiv.appendChild(followBtn);
            userList.appendChild(userDiv);
        }
    });
}

// Toggle follow/unfollow a user
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

