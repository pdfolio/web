import React, { useState } from 'react';

function Post({ id, title, content, likes, onLike }) {
    return (
        <div className="post">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => onLike(id)}>Like</button>
            <span>Likes: {likes}</span>
        </div>
    );
}

function App() {
    const initialPosts = [
        { id: 1, title: 'Post 1', content: 'Content 1', likes: 0 },
        { id: 2, title: 'Post 2', content: 'Content 2', likes: 0 },
        // Add more posts
    ];

    const [posts, setPosts] = useState(initialPosts);

    const handleLike = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        });

        setPosts(updatedPosts);
    };

    return (
        <div className="app">
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    likes={post.likes}
                    onLike={handleLike}
                />
            ))}
        </div>
    );
}

export default App;