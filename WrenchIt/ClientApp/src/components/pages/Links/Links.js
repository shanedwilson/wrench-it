import React from 'react';
import VideoSearch from '../../VideoSearch/VideoSearch';
import youTubeRequests from '../../../helpers/data/youTubeRequests';
import VideoList from '../../VidoeList/VideoList';
import VideoDetail from '../../VideoDetail/VideoDetail';

import './Links.scss';

class Links extends React.Component{
    state = {
        videos: [],
        selectedVideo: null,
    }

    handleSubmit = async (searchValue) => {
        const response = await youTubeRequests.getVideos(searchValue)
        this.setState({ videos: response.data.items, selectedVideo: null });
    };

    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render(){
        const {selectedVideo} = this.state;

        const videos = [...this.state.videos];

        return(
            <div className="links-container">
                <VideoSearch handleFormSubmit={this.handleSubmit}/>
                <div className="w-100 mx-auto">
                    <div className="mt-3 mx-auto">
                        <VideoDetail video={selectedVideo}/>
                    </div>
                        <VideoList
                            handleVideoSelect={this.handleVideoSelect}
                            videos={videos}
                        />
                </div>
            </div>
        )
    }
}

export default Links