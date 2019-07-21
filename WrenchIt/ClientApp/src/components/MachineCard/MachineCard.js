import React from 'react';

class MachineCard extends React.Component{
    
    render(){
        const {selectedMachine} = this.props;

        return(
            <div className="d-flex justify-content-center">
            <div className="machine-card border border-dark rounded animated fadeIn w-50 mt-5 text-center" id={selectedMachine.id}>
                <h3 className="text-center profile-header">{selectedMachine.year} {selectedMachine.make} {selectedMachine.model} {selectedMachine.trim}</h3>
                <div className="ml-1">Oil Type: {selectedMachine.oilType}</div>
                <div className="ml-1">Oil Quantity: {selectedMachine.oilQuantity} Quarts</div>
                <div className="ml-1">Tire Size: {selectedMachine.tireSize}</div>
                <div className="ml-1">Tire Pressure: {selectedMachine.tirePressure}</div>
                <div className="ml-1">Service Interval: {selectedMachine.serviceInterval}</div>
                <button id='machine-edit' type="button" className="bttn-pill profile-edit-btn ml-2" onClick={this.editMachine} title="Edit Machine">
                    <i className="far fa-edit fa-1x"/>
                </button>
                <button id='machine-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.deleteMachine} title="Delete Machine">
                    <i className="machine-delete-btn fas fa-trash fa-1x"></i>
                </button>
                <button id='machine-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.showPartsDiv} title="See/Hide Parts">
                    <i className="fas fa-cogs"></i>
                </button>
                <button id='machine-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.goToService} title="Add A Service Record">
                <i className="fas fa-tools"></i>
                </button>
            </div>
        </div>
        )
    }
}

export default MachineCard;