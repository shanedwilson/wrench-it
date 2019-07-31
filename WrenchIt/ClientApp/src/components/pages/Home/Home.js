import React from 'react';
import AddEditMachine from '../../AddEditMachine/AddEditMachine';
import machineRequests from '../../../helpers/data/machineRequests';
import serviceRequests from '../../../helpers/data/serviceRequests';
import PropTypes from 'prop-types';

import './Home.scss';

class Home extends React.Component{
    homeMounted = false;

    state = {
        modal: false,
        isEditingMachine: false,
        alertServices: [],
        machines: [],
        services: [],
    }

    static propTypes = {
        currentUser: PropTypes.object,
    }

    changeView = (e) => {
        const view = e.currentTarget.id;
        this.props.history.push(`/${view}`);
    }

    toggleMachineModal = () => {
        const { modal } = this.state;

        this.setState({ modal: !modal });
    }

    render(){
        const { modal,isEditingMachine } = this.state;

        const { currentUser } = this.props;

        return(
            <div className="home w-50 mx-auto">
                <div className="d-flex justify-content-center flex-wrap homeWrapper mt-5">
                    <div className="card m-3 border-dark animated zoomIn" id="myGarage" onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="home-icon-1 fas fa-6x fa-car"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">My Garage</h5>
                        </div>
                    </div>
                    <div className="card m-3 border-dark animated zoomIn" id='addMacine' onClick={this.toggleMachineModal}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="home-icon-2 fas fa-plus-circle fa-6x"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">Add Machine</h5>
                        </div>
                    </div>
                    <div className="card m-3 border-dark animated zoomIn" id='links' onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="fas fa-6x fa-tools home-icon-3"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">DIY Links</h5>
                        </div>
                    </div>
                    {/* <div className="card m-3 border-dark animated zoomIn" id='alerts' onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i id="alert-icon" className="fas fa-6x fa-exclamation-triangle home-icon-4"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">Alerts</h5>
                        </div>
                    </div> */}
                </div>
                <AddEditMachine
                    toggleMachineModal = {this.toggleMachineModal}
                    modal = {modal}
                    currentUser = {currentUser}
                    isEditing = {isEditingMachine}
                />
            </div>
        )
    }
}

export default Home;
