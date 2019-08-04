import React from 'react';

class LinksTable extends React.Component {
    linkSelectEvent = (e) => {
        const videoId = e.currentTarget.id;
        this.props.handleLinkSelect(videoId);
    }

    deleteLinkEvent = (e) => {
        const linkId = e.currentTarget.dataset.deleteid * 1;
        this.props.deleteLink(linkId);
    }

    render() {
        const { savedMachineLinks } = this.props;

        const createLinks = () => {
            return (
                savedMachineLinks.map((sml) => 
                    <tr className="mt-5"  key={sml.id}>
                        <td className="service-machine" onClick={this.linkSelectEvent} id={sml.youTubeId}>
                            {sml.name}
                        </td>
                        <td onClick={this.deleteLinkEvent} title="Delete Machine" data-deleteid={sml.id}>
                            <i className="delete-btn fas fa-trash"></i>
                        </td>
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
                            <th scope="col">Delete Link</th>
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
