import React from 'react';
import PropTypes from 'prop-types';
import AddEditUser from '../../AddEditUser/AddEditUser';
import userRequests from '../../../helpers/data/userRequests';

import './Profile.scss';

class Profile extends React.Component{
    profileMounted = false;
    
    static propTypes = {
        currentUser: PropTypes.object,
    }

    state = {
        currentUser: {},
        isEditingUser: false,
    }

    editProfile = () => {
        const {isEditingUser} = this.state;
        this.setState({ isEditingUser: !isEditingUser })
    }

    getUser = () => {
        const currentUser = {...this.state.currentUser};
        const userId = currentUser.firebaseId;
        userRequests.getSingleUser(userId)
            .then((user) => {
                this.setState({currentUser: user.data})
            })
    }

    componentDidMount() {
        const { currentUser } = this.props;
        this.profileMounted = !!currentUser.id;

        if (this.profileMounted) {
            this.setState({ currentUser })
        }
    }

    render() {
        const currentUser = {...this.state.currentUser};

        const {isEditingUser} = this.state;

        const buildView = () => {
            if (isEditingUser) {
                return (
                    <div>
                        <AddEditUser 
                            isEditingUser={isEditingUser}
                            currentUser = {currentUser}
                            editProfile={this.editProfile}
                            getUser={this.getUser}
                        />
                    </div>
                )
            }
            return(
                <div className="profile-container mx-auto animated fadeIn">
                    <div className="d-flex justify-content-center">
                        <div className="profile-card border border-dark rounded animated fadeIn w-75 mt-5 text-center" id={currentUser.id}>
                            <header className="text-center profile-header">{currentUser.name}</header>
                            <div className="profile-body p-3">
                                <div className="ml-1">Email: {currentUser.email}</div>
                                <div className="ml-1">Street: {currentUser.street}</div>
                                <div className="ml-1">City: {currentUser.city}</div>
                                <div className="ml-1">State: {currentUser.state}</div>
                                <div className="ml-1">Postal Code: {currentUser.postalCode}</div>
                                <div className="ml-1">Phone Number: {currentUser.phoneNumber}</div>
                                <div>
                                    <button id='profile-edit' type="button" className="bttn-pill edit-btn ml-2 mt-2" onClick={this.editProfile} title="Edit Profile">
                                        <i className="far fa-edit fa-1x"/>
                                    </button>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
            {buildView()}
            </div>
        )
    }
}

export default Profile;
