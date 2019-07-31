import React from 'react';

import './VideoItem.scss';

const VideoItem = ({ video, handleVideoSelect }) => {

    return (
        <div onClick={ () => handleVideoSelect(video) } className="card video-card h-100 video-item item col-4">
            <img
                className="image mt-2"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.description}
            />
            <div className="content">
                <div className="header">{video.snippet.title}</div>
            </div>
        </div>
    )
}

export default VideoItem;
