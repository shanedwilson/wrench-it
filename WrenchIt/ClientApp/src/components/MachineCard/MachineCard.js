import React from 'react';
import PropTypes from 'prop-types';


class MachineCard extends React.Component{
    static propTypes = {
        selectedMachine: PropTypes.object,
        isService: PropTypes.bool,
        editMachine: PropTypes.func,
        deleteMachine: PropTypes.func,
        showPartsDiv: PropTypes.func,
        goToService: PropTypes.func,
        toggleServiceModal: PropTypes.func,
    }

    editMachineEvent = () => {
        this.props.editMachine();
    }

    deleteMachineEvent = () => {
        this.props.deleteMachine();
    }

    showPartsDivEvent = () => {
        this.props.showPartsDiv();
    }

    goToServiceEvent = () => {
        this.props.goToService();
    }

    toggleServiceModalEvent =() => {
        this.props.toggleServiceModal();
    }
    
    render(){
        const {selectedMachine, isService} = this.props;

        const makeButtons = () => {
            if(isService) {
                return(
                    <div>
                        <button id='goto-service' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.toggleServiceModalEvent} title="Create A Service Record">
                            <i className="fas fa-tools"></i>
                        </button>
                    </div>
                )
            }
            return(
                <div>
                    <button id='machine-edit' type="button" className="bttn-pill profile-edit-btn ml-2" onClick={this.editMachineEvent} title="Edit Machine">
                        <i className="far fa-edit fa-1x"/>
                    </button>
                    <button id='machine-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.deleteMachineEvent} title="Delete Machine">
                        <i className="machine-delete-btn fas fa-trash fa-1x"></i>
                    </button>
                    <button id='show-parts' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.showPartsDivEvent} title="See/Hide Parts">
                        <i className="fas fa-cogs"></i>
                    </button>
                    <button id='goto-service' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.goToServiceEvent} title="Add A Service Record">
                        <i className="fas fa-tools"></i>
                    </button>
                </div>
            )
        }
        return(
            <div className="d-flex justify-content-center">
            <div className="machine-card border border-dark rounded animated fadeIn w-50 mt-5 text-center" id={selectedMachine.id}>
                <h3 className="text-center profile-header">{selectedMachine.year} {selectedMachine.make} {selectedMachine.model} {selectedMachine.trim}</h3>
                <div className="ml-1">Oil Type: {selectedMachine.oilType}</div>
                <div className="ml-1">Oil Quantity: {selectedMachine.oilQuantity} Quarts</div>
                <div className="ml-1">Tire Size: {selectedMachine.tireSize}</div>
                <div className="ml-1">Tire Pressure: {selectedMachine.tirePressure}</div>
                <div className="ml-1">Service Interval: {selectedMachine.serviceInterval}</div>
                {makeButtons()}
            </div>
        </div>
        )
    }
}

export default MachineCard;