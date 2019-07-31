import React from 'react';
import VideoItem from '../VideoItem/VideoItem';

const VideoList = ({ videos, handleVideoSelect}) => {
    const renderedVideos = videos.map((video, index) => {
        return <VideoItem 
                    key={index}
                    video={video}
                    handleVideoSelect={handleVideoSelect}
                />
    });
    return(
        <div className="row d-flex justify-content-center">
            <div className="card-deck">
                {renderedVideos}
            </div>
        </div>
    )

}

export default VideoList;
