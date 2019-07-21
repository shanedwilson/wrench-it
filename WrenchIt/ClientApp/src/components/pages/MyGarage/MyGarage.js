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
        oil: 0,
        oilFilter: 0,
        sparkPlug: 0,
        airFilter: 0,
        cabinFilter: 0,
        brakePads: 0,
        battery: 0,
        belt: 0,
        wiperLeft: 0,
        wiperRight: 0,
        headLight: 0,
        turnLight: 0,
        tailLight: 0,
        selectedMachineId: 0,
        selectedPartType: 0,
        selectedMachine: {},
        isEditing: false,
        modal: false,
        showParts: false,
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

    showPartsDiv = () => {
        const { showParts } = this.state;
        this.setState({ showParts: !showParts });
    }

    goToService = () => {
        const id = this.state.selectedMachineId
        this.props.history.push(`/service/${id}`);

    }

    selectPart = (e) => {
        const { machineParts }= this.state;
        const partId = e.target.value * 1;
        const filteredParts = machineParts.filter(part => part.id === partId);
        const partType = filteredParts[0].typeId;
        switch (partType) {
            case 1:
                this.setState({ oil: partId });
                break;
            case 2:
                this.setState({ oilFilter: partId });
                break;
            case 3:
                this.setState({ sparkPlug: partId });
                break;
            case 4:
                this.setState({ airFilter: partId });
                break;
            case 5:
                this.setState({ cabinFilter: partId });
                break;
            case 6:
                this.setState({ brakePads: partId });
                break;
            case 7:
                this.setState({ battery: partId });
                break;
            case 8:
                this.setState({ belt: partId });
                break;
            case 9:
                this.setState({ wiperLeft: partId });
                break;
            case 10:
                this.setState({ wiperRight: partId })
                break;
            case 11:
                this.setState({ headLight: partId });
                break;
            case 12:
                this.setState({ turnLight: partId });
                break;
            case 13:
                this.setState({ tailLight: partId });
                break;
            default:

       }
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

        const { selectedMachine, modal, isEditing, selectedPartType, selectedMachineId, showParts } = this.state;

        const makeDropdown = () => {
            return (
                    <div className="text-center mt-5">
                        <select name="machines" required className="custom-select w-50" value={selectedMachineId}
                                onChange={(event) => { this.selectMachine(event) }}>
                        <option value="">Select Your Machine</option>
                        {
                            machines.map((machine, i) => (
                                <option key={i} value={machine.id}>
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
                  );
            }
            return<div></div>
        }

        const makePartsDiv = () => {
            if(showParts) {
                return (
                    <MachinePartsDropdown
                        partTypes = {partTypes}
                        machineParts = {machineParts}
                        selectedPartType = {selectedPartType}
                        selectPart = {this.selectPart}
                    />
                )
            }
        }

        return(
            
            <div className="myGarage mx-auto">
                <h1 className="text-center">My Garage</h1>
                <div className="w-75 mx-auto">
                    {makeDropdown()}
                    {makeMachineCard()}
                    {makePartsDiv()}
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
