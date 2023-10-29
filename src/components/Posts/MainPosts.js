import React, { useState } from "react";
import PostStatistics from "./PostStatistics";
import CommentsSection from "./CommentsSection";

function decodeHtmlEntities(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
}

function handleHashtags(inputText) {
    if (!inputText) return '';
    const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
    return inputText.replace(hashtagRegex, (match, tag) => {
        return `{{HASHTAG:${tag}}}`;
    });
}

function replaceHashtagsWithLinks(inputText) {
    const placeholderRegex = /{{HASHTAG:([a-zA-Z0-9_]+)}}/g;
    return inputText.replace(placeholderRegex, (match, tag) => {
        return `<a href="https://rougee.io/hashtag/${tag}">#${tag}</a>`;
    });
}

function renderMediaContent(post) {
    if (post.postYoutube && post.postYoutube.trim() !== "") {
        return (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: "50vh", overflow: 'hidden' }}>
                <iframe
                    title="YouTube Video"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${post.postYoutube}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        );
    } else if (post.postVimeo && post.postVimeo.trim() !== "") {
        return (
            <iframe
                title="Vimeo Video"
                src={`https://player.vimeo.com/video/${post.postVimeo}`}
                width="560"
                height="315"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        );
    }

    if (post.postFile_full && post.postFile_full.includes("https://rougee.io/upload/sounds")) {
        return (
            <audio controls>
                <source src={post.postFile_full} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        );
    }

    if (post.postFile_full && post.postFile_full.includes("https://rougee.io/upload/videos")) {
        return (
            <video width="560" height="315" controls>
                <source src={post.postFile_full} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    if (post.postFile_full && !post.postFile_full.includes("https://rougee.io/upload/videos")) {
        return <img src={post.postFile_full} alt="Post Media" />;
    }

    if (post.postLinkImage && post.postLinkImage.startsWith("http")) {
        return <img src={post.postLinkImage} alt="Post Link" />;
    }

    return null;
}
function extractHashtags(text) {
    const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
    const matches = text.match(hashtagRegex);
    return matches || [];
}
function Post({ post, isPromoted }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const decodedText = decodeHtmlEntities(post.postText);
    const hashtagHandledText = handleHashtags(decodedText);
    const replacedText = replaceHashtagsWithLinks(hashtagHandledText);
    const location = " Milky Way 🌌";  // Default location
    // Convert Unix timestamp to JavaScript Date object
    const dateObject = new Date(post.time * 1000);  // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = dateObject.toLocaleString();  // Convert the Date object to a string in local date and time format
    const displayedText = isExpanded || decodedText.length <= 100 ? replacedText : `${replacedText.substring(0, 100)}...`;
    const hashtags = extractHashtags(decodedText);
    
    return (
        <div className="post-box">
            {/* Render hashtags at the top */}
            <div className="post-hashtags">
                {hashtags.map((hashtag, index) => (
                    <a key={index} href={`https://rougee.io/hashtag/${hashtag.slice(1)}`} className="hash">{hashtag}</a>
                ))}
            </div>
            <div className="post-header">
                <img className="avatar" src={post.publisher.avatar} alt="User Avatar" />
                <h3 className="username">{post.publisher.username}</h3>
            </div>
            <div className="post-content">
                <h2>{isPromoted ? "Sponsored:" : ""}</h2>
                <div className="caption"><p dangerouslySetInnerHTML={{ __html: displayedText }}></p></div>

                {decodedText.length > 100 && (
                    <span onClick={() => setIsExpanded(!isExpanded)} style={{ color: "blue", cursor: "pointer" }}>
                        {isExpanded ? "See Less" : "See More"}
                    </span>
                )}
                {renderMediaContent(post)}
            </div>
            <PostStatistics
                reactions={post.post_likes}
                comments={post.post_comments}
                shares={post.post_shares}
            />
            {post.comments && <CommentsSection comments={post.comments} />}
            <div className="post-meta-data">
                <span>{formattedDate}</span>
                <span>{location}</span>
            </div>
        </div>
    );
}

export default Post;
