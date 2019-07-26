import React from 'react';

import './Profile.scss';

class Profile extends React.Component{
    profileMounted = false;

    state = {
        currentUser: {},
    }

    componentDidMount() {
        const { currentUser } = this.props;
        this.profileMounted = !!currentUser.id;

        if (this.profileMounted) {
            this.setState({ currentUser })
        }
    }

    render() {
        return (
            <div>PROFILE</div>
        )
    }
}

export default Profile;
