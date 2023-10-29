import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeApiRequest, endpoints } from "../../api";
import BottomNavbar from "../BottomNavbar";
import PostPlaceholder from './PostPlaceholder';
import Post from "./MainPosts";

function Feed(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promotedPost, setPromotedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  const navigate = useNavigate();

  const refreshFeed = useCallback(() => {
    setRefreshCounter((prevCount) => prevCount + 1);
    setCurrentPage(1);
    setPosts([]);
    setDisplayedPosts([]);  // Also reset the displayedPosts
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
        return;
      }
      setDisplayedPosts(prevPosts => {
        const nextIndex = prevPosts.length;
        return [...prevPosts, ...posts.slice(nextIndex, nextIndex + 10)];
      });
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, posts]);  // Added the dependencies

  useEffect(() => {
    const fetchFeedData = async () => {
      setLoading(true);
      try {
        if (currentPage === 1) { // Fetch promoted post only on the first page
          const promotedResponse = await makeApiRequest(endpoints.promotedPost, {}, () => navigate("/loginpage"));
          if (promotedResponse.api_status === 200) {
            setPromotedPost(promotedResponse.data);
          } else {
            throw new Error("Error fetching promoted post.");
          }
        }

        const postsResponse = await makeApiRequest(endpoints.posts, {
          type: "get_news_feed",
          limit: 30
      }, () => navigate("/loginpage"));

      if (postsResponse.api_status === 200) {
          // If the fetched posts are less than 30, then there are no more posts to fetch.
          if (postsResponse.data.length < 30) {
              setHasMore(false);
          }

          setPosts(prevPosts => [...prevPosts, ...postsResponse.data]);

          // On the first fetch or after a refresh, set the displayed posts to the first 10
          if (currentPage === 1) {
              setDisplayedPosts(postsResponse.data.slice(0, 5));
          }
      } else {
          throw new Error("Error fetching regular posts.");
      }
  } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
  } finally {
      setLoading(false);
  }
};

fetchFeedData();
}, [navigate, refreshCounter, currentPage]);

useEffect(() => {
function handleScroll() {
  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
      return;
  }
  // Display the next 10 posts
  setDisplayedPosts(prevDisplayed => {
      const nextIndex = prevDisplayed.length;
      return [...prevDisplayed, ...posts.slice(nextIndex, nextIndex + 10)];
  });
}

window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, [hasMore, posts]);

if (loading) {
return (
  <div>
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
  </div>
);
}

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <div className="feed-container">
            {promotedPost && <Post post={promotedPost} isPromoted={true} />}
            {displayedPosts.map((post, index) => (  // Use displayedPosts here
                <Post key={index} post={post} />
            ))}
        </div>
        <BottomNavbar onHomeClick={refreshFeed} />
    </div>
  );
}

export default Feed;
