import React from "react";
import { FaHeart, FaCommentAlt, FaShareSquare } from "react-icons/fa"; 

function PostStatistics({ reactions, comments, shares }) {
    return (
        <div className="post-statistics">
            <span className="stat-item">
                <FaHeart />
                {reactions > 0 && <span className="stat-count">{reactions}</span>}
            </span>
            <span className="stat-item">
                <FaCommentAlt />
                {comments > 0 && <span className="stat-count">{comments}</span>}
            </span>
            <span className="stat-item">
                <FaShareSquare />
                {shares > 0 && <span className="stat-count">{shares}</span>}
            </span>
        </div>
    );
}

export default PostStatistics;
