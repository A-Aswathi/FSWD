// app.js

// Function to create a new post element
function createPost(content, imageSrc, timestamp) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    
    const postContent = document.createElement('p');
    postContent.textContent = content;
    
    const postDate = document.createElement('small');
    postDate.classList.add('timestamp');
    postDate.textContent = timestamp;
    
    const postImage = document.createElement('img');
    postImage.classList.add('post-image');
    if (imageSrc) {
        postImage.src = imageSrc;
        postImage.style.display = 'block';
    } else {
        postImage.style.display = 'none';
    }
    
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '❤️ Like';
    likeButton.addEventListener('click', function() {
        this.classList.toggle('liked');
        this.innerHTML = this.classList.contains('liked') ? '❤️ Liked' : '❤️ Like';
    });
    
    postElement.appendChild(postContent);
    postElement.appendChild(postDate);
    postElement.appendChild(postImage);
    postElement.appendChild(likeButton);
    
    return postElement;
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const postContent = document.getElementById('postContent').value.trim();
    const postImage = document.getElementById('postImage').files[0];
    
    if (postContent) {
        const postsContainer = document.getElementById('postsContainer');
        
        const timestamp = new Date().toLocaleString(); // Get current date and time
        const imageSrc = postImage ? URL.createObjectURL(postImage) : null;
        
        const newPost = createPost(postContent, imageSrc, timestamp);
        postsContainer.prepend(newPost); // Add new post to the top
        document.getElementById('postContent').value = ''; // Clear the textarea
        document.getElementById('postImage').value = ''; // Clear the file input
    }
});
