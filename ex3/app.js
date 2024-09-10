document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('postsContainer');

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const content = postContent.value.trim();
        
        if (content) {
            // Create a new post element
            const post = document.createElement('div');
            post.className = 'post';
            post.textContent = content;
            
            // Add the new post to the container
            postsContainer.prepend(post);
            
            // Clear the textarea
            postContent.value = '';
        }
    });
});
