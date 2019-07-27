import React from 'react';
import VideoSearch from '../../VideoSearch/VideoSearch';
import youTubeRequests from '../../../helpers/data/youTubeRequests';
import VideoList from '../../VidoeList/VideoList';
import VideoDetail from '../../VideoDetail/VideoDetail';

class Links extends React.Component{
    state = {
        videos: [],
        selectedVideo: null,
    }

    handleSubmit = async (searchValue) => {
        const response = await youTubeRequests.getVideos(searchValue)
        console.log(response);
        this.setState({ videos: response.data.items });
    };

    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render(){
        const {selectedVideo} = this.state;

        const videos = [...this.state.videos];

        return(
            <div className="ui container">
                <VideoSearch handleFormSubmit={this.handleSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList
                                handleVideoSelect={this.handleVideoSelect}
                                videos={videos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Links