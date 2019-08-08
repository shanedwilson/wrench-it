import React from 'react';

const VideoDetail = ({ video, checkExistingLinks, selectedVideoId }) => {
  if (video && !selectedVideoId) {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div className="">
            <div className="text-center">
                <iframe src={videoSrc} allowFullScreen title='Video player' className="shadow-lg"/>
            </div>
            <div className='segment'>
                <h4 className='header text-center'>{video.snippet.title}</h4>
                <p className='text-center'>{video.snippet.description}</p>
                <div className="button-div text-center">
                    <button className="bttn-pill add-btn mb-2" onClick={checkExistingLinks} title="Save Vidoe Link">
                        <i className="fas fa-video"></i>
                    </button>
                </div>
            </div>
        </div>
    );
  } if (!video && selectedVideoId) {
    const videoSrc = `https://www.youtube.com/embed/${selectedVideoId}`;
    return (
            <div className="">
                <div className="text-center">
                    <iframe src={videoSrc} allowFullScreen title='Video player'/>
                </div>
                <div className='segment'>
                    {/* <h4 className='header text-center'>{video.snippet.title}</h4> */}
                </div>
            </div>
    );
  } if (!video && !selectedVideoId) {
    return <div></div>;
  }
  return (<div></div>);
};

export default VideoDetail;
