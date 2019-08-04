import React from 'react';
import VideoSearch from '../../VideoSearch/VideoSearch';
import youTubeRequests from '../../../helpers/data/youTubeRequests';
import VideoList from '../../VidoeList/VideoList';
import VideoDetail from '../../VideoDetail/VideoDetail';
import MachineDropdown from '../../MachineDropdown/MachineDropdown';
import LinksTable from '../../LinksTable/LinksTable';
import linkRequests from '../../../helpers/data/linkRequests';
import machineRequests from '../../../helpers/data/machineRequests';

import './Links.scss';

const defaultLink = {
    name: "",
    youTubeId: "",
  };

const defaulMachinetLink = {
    machineId: 0,
    linkId: 0,
  };

class Links extends React.Component{
    linksMounted = false;
    
    state = {
        videos: [],
        selectedVideo: null,
        selectedVideoId: null,
        savedMachineLinks: [],
        newLink: defaultLink,
        newMachineLink: defaulMachinetLink,
        machines: [],
        selectedMachineId: 0,
        machineLinks: [],
    }

    getAllMachinesById = (id) => {
        machineRequests.getAllMachinesById(id)
          .then((machinesObject) => {
            this.setState({ machines: machinesObject });
          });
    }

    getAllLinksByMachineId = (selectedMachineId) => {
        linkRequests.getAllLinksByMachineId(selectedMachineId)
            .then((links) => {
                this.setState({ savedMachineLinks: links })
            });
    }

    selectMachine = (e) => {
        const selectedMachineId =  e.target.value * 1;
        this.setState({ selectedMachineId });
        this.getAllLinksByMachineId(selectedMachineId)
    }

    handleSubmit = async (searchValue) => {
        const response = await youTubeRequests.getVideos(searchValue)
        this.setState({ videos: response.data.items, selectedVideo: null, selectedVideoId: null });
    };

    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video, selectedVideoId: null });
    }

    handleLinkSelect = (videoId) => {
        this.setState({ selectedVideoId: videoId, selectedVideo: null });
    }


    saveMachineLink = (linkId) => {
        const myMachineLink = { ...this.state.newMachineLink };
        const { machineId } = this.state;
        myMachineLink.linkId = linkId;
        myMachineLink.machineId = machineId;
        
    }

    saveLink = () => {
        const selectedVideo = {...this.state.selectedVideo};
        const myLink = { ...this.state.newLink };
            myLink.name = selectedVideo.snippet.title;
            myLink.youTubeId = selectedVideo.id.videoId;
          this.setState({ newLink: defaultLink });
          linkRequests.createLink(myLink)
            .then((link) => {
                const linkId = link.data.id;
                this.saveMachineLink(linkId);
            })
    }

    componentDidMount = () => {
        const { currentUser } = this.props;
        this.linksMounted = !!currentUser.id;
        const userId = currentUser.id

        if (this.linksMounted) {
        this.getAllMachinesById(userId);
        }
    }

    render(){
        const {selectedVideo, selectedMachineId, selectedVideoId } = this.state;

        const machines = [...this.state.machines]

        const videos = [...this.state.videos];

        const savedMachineLinks = [...this.state.savedMachineLinks];

        return(
            <div className="links-container animated fadeIn">
                <VideoSearch handleFormSubmit={this.handleSubmit}/>
                <div className="w-100 mx-auto">
                    <div className="mt-3 mx-auto">
                        <VideoDetail
                            video={selectedVideo}
                            saveLink={this.saveLink}
                            selectedVideoId={selectedVideoId}
                        />
                    </div>
                    <div className="animated fadeIn">
                        <VideoList
                            handleVideoSelect={this.handleVideoSelect}
                            videos={videos}
                        />
                    </div>    
                </div>
                <div className="dropdown-container mx-auto mt-5">
                    <h2 className="text-center">Saved Video Links</h2>
                    <MachineDropdown
                        machines={machines}
                        selectedMachineId={selectedMachineId}
                        selectMachine={this.selectMachine}
                    />
                    <LinksTable
                        savedMachineLinks={savedMachineLinks}
                        handleLinkSelect={this.handleLinkSelect}
                    />
                </div>
            </div>
        )
    }
}

export default Links