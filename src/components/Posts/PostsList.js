import React, { useState, useEffect } from 'react';
import Post from './Post';
import { makeApiRequest, endpoints } from './api';  // Import the necessary functions and endpoints

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
                return;
            }
            setCurrentPage(prevPage => prevPage + 1);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await makeApiRequest(endpoints.posts, { page: currentPage });  // Pass the current page to the API request

                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts(prevPosts => [...prevPosts, ...data]);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        }

        fetchPosts();
    }, [currentPage]);

    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            {!hasMore && <p>No more posts to load</p>}
        </div>
    );
}

export default PostsList;
