import React from 'react';
import PropTypes from 'prop-types';
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
  name: '',
  youTubeId: '',
  machineId: 0,
};

class Links extends React.Component {
    linksMounted = false;

    state = {
      videos: [],
      selectedVideo: null,
      selectedVideoId: '',
      savedMachineLinks: [],
      newLink: defaultLink,
      machines: [],
      selectedMachineId: 0,
      allLinks: [],
      inactiveMachines: [],
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    checkExistingLinks = (e) => {
      e.preventDefault();
      const myLink = { ...this.state.newLink };
      const allLinks = [...this.state.allLinks];
      const { selectedMachineId } = this.state;
      const filteredLinks = allLinks.filter(link => link.name.toLowerCase() === myLink.name.toLowerCase()
                                                && link.youTubeId.toLowerCase() === myLink.youTubeId.toLowerCase()
                                                && link.machineId === selectedMachineId);
      if (filteredLinks.length > 0) {
        this.getAllLinksByMachineId(selectedMachineId);
      } else {
        this.saveLink(e);
      }
    }

    getAllMachinesById = (id) => {
      machineRequests.getAllMachinesById(id)
        .then((machinesObject) => {
          this.setState({ machines: machinesObject });
        });
    }

    getAllInactiveMachinesById = (id) => {
      machineRequests.getAllInactiveMachinesById(id)
        .then((machinesObject) => {
          this.setState({ inactiveMachines: machinesObject });
        });
    }

    getAllLinksByMachineId = (selectedMachineId) => {
      linkRequests.getAllLinksByMachineId(selectedMachineId)
        .then((links) => {
          this.setState({ savedMachineLinks: links });
        });
    }

    selectMachine = (e) => {
      const selectedMachineId = e.target.value * 1;
      this.setState({
        selectedMachineId,
        selectedVideo: null,
        videos: [],
        selectedVideoId: 0,
      });
      this.getAllLinksByMachineId(selectedMachineId);
    }

    handleSubmit = async (searchValue) => {
      const response = await youTubeRequests.getVideos(searchValue);
      this.setState({ videos: response.data.items, selectedVideo: null, selectedVideoId: null });
    };

    handleVideoSelect = (video) => {
      const myLink = { ...this.state.newLink };
      myLink.name = video.snippet.title;
      myLink.youTubeId = video.id.videoId;
      this.setState({
        selectedVideo: video,
        selectedVideoId: null,
        newLink: myLink,
      });
    }

    handleLinkSelect = (videoId) => {
      this.setState({ selectedVideoId: videoId, selectedVideo: null });
    }

    saveLink = () => {
      const { selectedMachineId } = this.state;
      const selectedVideo = { ...this.state.selectedVideo };
      const myLink = { ...this.state.newLink };
      myLink.name = selectedVideo.snippet.title;
      myLink.youTubeId = selectedVideo.id.videoId;
      myLink.machineId = selectedMachineId;
      this.setState({ newLink: defaultLink });
      linkRequests.createLink(myLink)
        .then(() => {
          this.getAllLinksByMachineId(selectedMachineId);
          this.setState({ selectedVideo: null, videos: [] });
        });
    }

    deleteLink = (linkId) => {
      const { selectedMachineId } = this.state;
      linkRequests.deleteLink(linkId)
        .then(() => {
          this.getAllLinksByMachineId(selectedMachineId);
        });
    }

    getAllLinks = () => {
      linkRequests.getAllLinks()
        .then((allLinks) => {
          this.setState({ allLinks });
        });
    }

    componentDidMount = () => {
      const { currentUser } = this.props;
      this.linksMounted = !!currentUser.id;
      const userId = currentUser.id;

      if (this.linksMounted) {
        this.getAllMachinesById(userId);
        this.getAllLinks();
        this.getAllInactiveMachinesById(userId);
      }
    }

    render() {
      const {
        selectedVideo, selectedMachineId, selectedVideoId, inactiveMachines,
      } = this.state;

      const machines = [...this.state.machines];

      const videos = [...this.state.videos];

      const savedMachineLinks = [...this.state.savedMachineLinks];

      const createDiv = () => {
        if (selectedMachineId) {
          return (
                    <div className="animated zoomIn sha">
                        <VideoSearch handleFormSubmit={this.handleSubmit}/>
                        <div className="w-100 mx-auto">
                            <div className="mt-3 mx-auto">
                                <VideoDetail
                                    video={selectedVideo}
                                    checkExistingLinks={this.checkExistingLinks}
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
                            <LinksTable
                                savedMachineLinks={savedMachineLinks}
                                handleLinkSelect={this.handleLinkSelect}
                                deleteLink={this.deleteLink}
                            />
                        </div>
                    </div>
          );
        }
        return (<div></div>);
      };

      return (
            <div className="links-container animated fadeIn">
                <div className="dropdown-container mx-auto mb-5">
                    <MachineDropdown
                        machines={machines}
                        selectedMachineId={selectedMachineId}
                        selectMachine={this.selectMachine}
                        inactiveMachines={inactiveMachines}
                    />
                </div>
                    {createDiv()}
            </div>
      );
    }
}

export default Links;
