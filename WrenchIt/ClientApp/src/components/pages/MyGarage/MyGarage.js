import React from 'react';
import AddEditMachine from '../../AddEditMachine/AddEditMachine';
import MachinePartsDropdown from '../../MachinePartsDropdown/MachinePartsDropdown';
import machineRequests from '../../../helpers/data/machineRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';
import partRequests from '../../../helpers/data/partRequests';

import './MyGarage.scss';

class MyGarage extends React.Component{
    myGarageMounted = false;

    state = {
        machines: [],
        partTypes: [],
        machineParts: [],
        oil: [],
        oilFilters: [],
        selectedMachineId: 0,
        selectedPartType: 0,
        selectedMachine: {},
        isEditing: false,
        modal: false,
    }

    toggleMachineModal = () => {
        const { modal, selectedMachineId } = this.state;

        this.setState({ modal: !modal });
        if(!modal){
            this.getSingleMachine(selectedMachineId);
        }
    }

    getAllMachinesById = (id) => {
        machineRequests.getAllMachinesById(id)
          .then((machinesObject) => {
            this.setState({ machines: machinesObject });
          });
      }

    getAllPartTypes = () => {
        partTypeRequests.getAllPartTypes()
          .then((partTypes) => {
            this.setState({ partTypes });
          });
      }

    getSingleMachine = (id) => {
        machineRequests.getSingleMachine(id)
          .then((machine) => {
            this.setState({ selectedMachine: machine.data });
            this.getPartsByMachine(id);
          });
      }

    getPartsByMachine = (id) => {
        partRequests.getPartsByMachineId(id)
            .then((machineParts) => {
                this.setState({ machineParts });
            });
      }

    selectMachine = (e) => {
        this.setState({ selectedMachineId: e.target.value * 1 });
        this.getSingleMachine(e.target.value * 1);
    }

    editMachine = () => {
        this.setState({ isEditing: true });
        this.toggleMachineModal();
    }

    machineDeleteCleanup = () => {
        const id = this.props.currentUser.id;
        this.setState({ selectedMachine: [] });
        this.getAllMachinesById(id);
    }

    deleteMachine = () => {
        const id = this.state.selectedMachine.id;
        machineRequests.deleteMachine(id)
        .then(()=> {
            this.machineDeleteCleanup();
        });
    }

    componentDidMount(){
        const { currentUser } = this.props;
        this.myGarageMounted = !!currentUser.id;
        if (this.myGarageMounted) {
            this.getAllMachinesById(currentUser.id);
            this.getAllPartTypes();
        }
    }

    render(){
        const machines = [...this.state.machines];

        const partTypes = [...this.state.partTypes];

        const machineParts = [...this.state.machineParts];

        const { currentUser } = this.props;

        const { selectedMachine, modal, isEditing, selectedPartType } = this.state;

        const makeDropdown = () => {
            return (
                    <div className="text-center mt-5">
                        <select name="machines" required className="custom-select w-50" value={selectedMachine}
                                onChange={(event) => { this.selectMachine(event) }}>
                        <option value="">Select Your Machine</option>
                        {
                            machines.map(machine => (
                                <option key={machine.id}value={machine.id}>
                                    {machine.year} {machine.make} {machine.model} {machine.trim}
                                </option>))
                        }
                        </select>
                    </div>
                    );
        };

        const makeMachineCard = () => {
            if(selectedMachine.id){
                return (
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
                                    <i className="profile-delete-btn fas fa-trash fa-1x"></i>
                                </button>
                            </div>

                        </div>
                  );
            }
            return<div></div>
        }

        return(
            
            <div className="myGarage mx-auto">
                <h1 className="text-center">My Garage</h1>
                <div className="w-75 mx-auto">
                    {makeDropdown()}
                    {makeMachineCard()}
                    <MachinePartsDropdown
                        partTypes = {partTypes}
                        machineParts = {machineParts}
                        selectedPartType = {selectedPartType}
                    />
                </div>
                <AddEditMachine
                    toggleMachineModal = {this.toggleMachineModal}
                    modal = {modal}
                    isEditing = {isEditing}
                    currentUser = {currentUser}
                    selectedMachine = {selectedMachine}
                    getSingleMachine = {this.getSingleMachine}
                />
            </div>
        )
    }
}

export default MyGarage;
