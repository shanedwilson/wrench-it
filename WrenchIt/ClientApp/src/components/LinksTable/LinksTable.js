import React from 'react';

class LinksTable extends React.Component {
    videoSelectEvent = (e) => {
        const videoId = e.currentTarget.id;
        this.props.handleVideoSelect(videoId);
    }
    render() {
        const { savedMachineLinks } = this.props;

        const createLinks = () => {
            return (
                savedMachineLinks.map((sml) => 
                    <tr className="mt-5" onClick={this.videoSelectEvent} key={sml.id} id={sml.youTubeId}>
                        <td className="service-machine">{sml.name}</td>
                    </tr>
                )
            )

        }


        return(
            <div className="table-div mx-auto mt-5">
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createLinks()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default LinksTable;
