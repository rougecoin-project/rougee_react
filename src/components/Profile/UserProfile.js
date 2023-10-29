import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { makeApiRequest, endpoints } from '../../api';
import Post from '../Posts/MainPosts';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [userPosts, setUserPosts] = useState({ data: [] });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID not found in local storage.');
        }

        const requestData = {
          type: 'get_user_posts',
          id: userId,
          limit: 10
        };

        const postsData = await makeApiRequest(endpoints.posts, requestData);
        setUserPosts(postsData);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID not found in local storage.');
        }

        const requestData = {
          user_id: userId,
          fetch: 'user_data,followers,following'
        };

        const data = await makeApiRequest(endpoints.getUserData, requestData);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    fetchData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="cover-photo" style={{ backgroundImage: `url(${userData.user_data.cover})` }}></div>
      <div className="avatar_p" style={{
        backgroundImage: 'url(' + userData.user_data.avatar + ')',
        width: '100px',
        height: '100px',
        backgroundSize: 'cover'
      }}></div>
      <div className="user-info">
        <div className="username">{userData.user_data.username}</div>
        <div className="follow-stats">
          {userData.user_data.details?.followers_count ?? 0} Followers • {userData.user_data.details?.following_count ?? 0} Following
        </div>
        <div className="bio-toggle-list">
          {isBioExpanded && (
            <p>
              {userData.user_data.about ? userData.user_data.about : 'No bio...boo 👻'}
            </p>
          )}
          <button onClick={() => setIsBioExpanded(!isBioExpanded)}>
            {isBioExpanded ? 'Hide Bio' : 'Show Bio'}
          </button>
        </div>
      </div>
      <div className="user-posts">
        {userPosts.data.length > 0 ? (
          userPosts.data.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
