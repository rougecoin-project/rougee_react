// PostPlaceholder.js
import React from 'react';
import '../../assets/styles/PostPlaceholder.css'; // Import the CSS

const PostPlaceholder = () => {
  return (
    <div className="post-box placeholder">
      <div className="post-header">
        <div className="avatar placeholder-avatar"></div>
        <h3 className="placeholder-text">Loading...</h3>
      </div>
      <div className="post-content">
        <h2 className="placeholder-text">Loading Post</h2>
        <p className="placeholder-text">Loading content...</p>
        {/* You can add more placeholder elements here as necessary */}
      </div>
    </div>
  );
};

export default PostPlaceholder;
