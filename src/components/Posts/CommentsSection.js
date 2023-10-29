import React, { useState } from "react";

function CommentsSection({ comments }) {
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState(comments);

    const handlePostComment = () => {
        const newCommentObj = {
            username: "CurrentUsername", // This should be fetched dynamically
            text: newComment
        };
        setLocalComments([...localComments, newCommentObj]);
        setNewComment('');
    };

    return (
        <div className="comments-section">
            <div className="comments-list">
                {localComments.map((comment, index) => (
                    <div key={index} className="comment">
                        <span><strong>{comment.username}</strong>: {comment.text}</span>
                    </div>
                ))}
            </div>
            <div className="add-comment">
                <input 
                    type="text" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Add a comment..."
                />
                <button onClick={handlePostComment}>Post</button>
            </div>
        </div>
    );
}


export default CommentsSection;
