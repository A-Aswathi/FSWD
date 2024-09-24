let posts = [];

document.getElementById("postForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const content = document.getElementById("postContent").value;
    const imageFile = document.getElementById("postImage").files[0];

    const postId = posts.length;
    const post = {
        id: postId,
        content: content,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        likes: 0,
        dislikes: 0,
        comments: []
    };

    posts.push(post);
    renderPosts();
    this.reset(); // Reset the form
});

function renderPosts() {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            <div class="likes">Likes: <span id="like-count-${post.id}">${post.likes}</span> | 
            Dislikes: <span id="dislike-count-${post.id}">${post.dislikes}</span></div>
            <button onclick="likePost(${post.id})">Like</button>
            <button onclick="dislikePost(${post.id})">Dislike</button>

            <div class="comments">
                <h4>Comments:</h4>
                <div id="comments-${post.id}"></div>
                <textarea id="comment-content-${post.id}" placeholder="Add a comment..."></textarea>
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
        renderComments(post.id);
    });
}

function likePost(postId) {
    posts[postId].likes++;
    renderPosts();
}

function dislikePost(postId) {
    posts[postId].dislikes++;
    renderPosts();
}

function addComment(postId) {
    const commentContent = document.getElementById(`comment-content-${postId}`).value;

    if (!commentContent) return;

    const comment = {
        content: commentContent,
        likes: 0,
        dislikes: 0
    };

    posts[postId].comments.push(comment);
    renderPosts();
}

function renderComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    commentsContainer.innerHTML = "";

    posts[postId].comments.forEach((comment, index) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <p>${comment.content}</p>
            <div class="comment-actions">
                <div>Likes: <span id="comment-like-count-${postId}-${index}">${comment.likes}</span> | 
                Dislikes: <span id="comment-dislike-count-${postId}-${index}">${comment.dislikes}</span></div>
                <div>
                    <button onclick="likeComment(${postId}, ${index})">Like</button>
                    <button onclick="dislikeComment(${postId}, ${index})">Dislike</button>
                </div>
            </div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

function likeComment(postId, commentIndex) {
    posts[postId].comments[commentIndex].likes++;
    renderPosts();
}

function dislikeComment(postId, commentIndex) {
    posts[postId].comments[commentIndex].dislikes++;
    renderPosts();
}
