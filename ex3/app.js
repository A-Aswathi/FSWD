document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsDiv = document.getElementById('posts');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const content = postContent.value;

        // Send the post to the server
        await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        postContent.value = '';
        loadPosts();
    });

    async function loadPosts() {
        const response = await fetch('/posts');
        const posts = await response.json();

        postsDiv.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.textContent = post.content;
            postsDiv.appendChild(postDiv);
        });
    }

    loadPosts();  // Initial load
});

