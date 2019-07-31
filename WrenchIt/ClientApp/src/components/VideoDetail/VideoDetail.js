import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div></div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div className="">
            <div className="text-center">
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className='segment'>
                <h4 className='header text-center'>{video.snippet.title}</h4>
                <p className='text-center'>{video.snippet.description}</p>
            </div>
        </div>

    )
}

export default VideoDetail;