import React from 'react';
import PropTypes from 'prop-types';

import './MachineCard.scss';

class MachineCard extends React.Component {
    static propTypes = {
      selectedMachine: PropTypes.object,
      isService: PropTypes.bool,
      editMachine: PropTypes.func,
      deleteMachine: PropTypes.func,
      showPartsDiv: PropTypes.func,
      showService: PropTypes.func,
      toggleServiceModal: PropTypes.func,
      showAddEditService: PropTypes.func,
      goToServiceHistory: PropTypes.func,
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

    showAddEditServiceEvent = () => {
      this.props.showAddEditService();
    }

    goToServiceHistoryEvent = () => {
      this.props.goToServiceHistory();
    }

    toggleServiceModalEvent =() => {
      this.props.toggleServiceModal();
    }

    render() {
      const { selectedMachine, isService } = this.props;

      const makeImage = () => {
        if (selectedMachine.imageUrl !== null || selectedMachine.imageUrl !== '') {
          return (
                <div className="card imgHolder mt-5 mb-5 w-25 mx-auto my-auto p-2">
                    <img className="selectedMachine-img card-img-top"src={selectedMachine.imageUrl} alt="machine"/>
                </div>
          );
        }
        return <div></div>;
      };

      const makeButtons = () => {
        if (isService) {
          return (
                    <div></div>
          );
        } if (selectedMachine.isActive) {
          return (
                    <div className="btn-container d-flex justify-content-between p-2">
                        <button id='machine-edit' type="button" className="bttn-pill edit-btn" onClick={this.editMachineEvent} title="Edit Machine">
                            <i className="far fa-edit fa-1x"/>
                        </button>
                        <button id='machine-delete' type="button" className="bttn-pill delete-btn" onClick={this.deleteMachineEvent} title="Delete Machine">
                            <i className="machine-delete-btn fas fa-trash fa-1x"></i>
                        </button>
                        <button id='show-parts' type="button" className="bttn-pill parts-btn" onClick={this.showPartsDivEvent} title="See/Hide Parts">
                            <i className="fas fa-cogs"></i>
                        </button>
                        <button id='goto-service' type="button" className="bttn-pill add-btn" onClick={this.showAddEditServiceEvent} title="Add A Service Record">
                            <i className="fas fa-tools"></i>
                        </button>
                        <button id='service-history' type="button" className="bttn-pill history-btn" onClick={this.goToServiceHistoryEvent} title="See Service History">
                            <i className="fas fa-file-medical-alt"></i>
                        </button>
                    </div>
          );
        }
        return (<div></div>);
      };

      const makeManualLink = () => {
        if (selectedMachine.serviceManualUrl !== null) {
          return (
            <div className="ml-1 mb-2">Service Manual: <a href={selectedMachine.serviceManualUrl} target="_blank">Manual</a></div>
          );
        }
        return (
          <div className="ml-1 mb-2">Service Manual: No Url Supplied</div>
        );
      };

      return (
            <div className="d-flex justify-content-center">
                {makeImage()}
                <div className="card machine-card border border-dark rounded animated fadeIn w-50 mt-5 mb-5 p-2 text-center" id={selectedMachine.id}>
                    <header className="text-center profile-header">
                        <span>{selectedMachine.year} {selectedMachine.make} {selectedMachine.model} {selectedMachine.trim}</span>
                    </header>
                    <div className="machine-body p-3">
                        <div className="ml-1">Oil Type: {selectedMachine.oilType}</div>
                        <div className="ml-1">Oil Quantity: {selectedMachine.oilQuantity} Quarts</div>
                        <div className="ml-1">Tire Size: {selectedMachine.tireSize}</div>
                        <div className="ml-1">Tire Pressure: {selectedMachine.tirePressure}</div>
                        <div className="ml-1">Service Interval: {selectedMachine.serviceInterval}</div>
                        {makeManualLink()}
                        {makeButtons()}
                    </div>
                </div>
            </div>
      );
    }
}

export default MachineCard;
