import React from 'react';
import AddEditMachine from '../../AddEditMachine/AddEditMachine';
import MachinePartsDropdown from '../../MachinePartsDropdown/MachinePartsDropdown';
import MachineCard from '../../MachineCard/MachineCard';
import AddEditPart from '../../AddEditPart/AddEditPart';
import Service from '../../Service/Service'
import machineRequests from '../../../helpers/data/machineRequests';
import machinePartRequests from '../../../helpers/data/machinePartRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';
import partRequests from '../../../helpers/data/partRequests';

import './MyGarage.scss';

class MyGarage extends React.Component{
    myGarageMounted = false;
    machineIdProps = false;

    state = {
        machines: [],
        partTypes: [],
        machineParts: [],
        selectedMachineId: 0,
        selectedPartType: 1000,
        selectedPartId: 0,
        selectedMachine: {},
        selectedPartToEdit: {},
        isEditing: false,
        isEditingPart: false,
        isEditingService: false,
        modal: false,
        showParts: false,
        dropdownParts: [],
        addPart: false,
        addEditServiceModal: false,
        isGarage: true,
    }

    toggleMachineModal = () => {
        const { modal, selectedMachineId } = this.state;

        this.setState({ modal: !modal });
        if(!modal){
            this.getSingleMachine(selectedMachineId);
        }
    }

    showAddEditService = () => {
        const {addEditServiceModal} = this.state;
        this.setState({addEditServiceModal: !addEditServiceModal})
    }

    routeToServiceHistory = () => {
        const machineId = this.state.selectedMachineId;
        this.props.history.push(`/service/history/${machineId}`);
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

    goToServiceHistory = () => {
        const id = this.state.selectedMachineId
        this.props.history.push(`/service/history/${id}`);
    }

    selectPartType = (e) => {
        const selectedPartType = e.currentTarget.value * 1;
        const { machineParts }= this.state;
        let dropdownParts = [];
        
        machineParts.forEach(mp => {
            if(mp.typeId === selectedPartType + 1){
                dropdownParts.push(mp);
            }
        });
        this.setState({ dropdownParts, selectedPartType });
    }

    selectPart = (e) => {
        const partId = e.currentTarget.value * 1;
        partRequests.getSinglePart(partId)
            .then((part)=> {
                this.setState({
                    selectedPartToEdit: part.data, 
                    addPart: true,
                    isEditingPart: true,
                    selectedPartType: 1000,
                    selectedPartId: 0,
                    dropdownParts: [],
                });
            })
    }

    deletePart = () => {
        const {selectedPartToEdit, addPart, selectedMachine, machineParts} = this.state;
        const partId = selectedPartToEdit.id;
        const machinePart = machineParts.filter(part => part.id === partId);
        const machinePartId = machinePart[0].machinePartId;
        machinePartRequests.deleteMachinePart(machinePartId)
        .then(() => {
            this.setState({ addPart: !addPart });
            this.getPartsByMachine(selectedMachine.id);
        })
    }

    showAddParts = () => {
        const { addPart, isEditingPart } = this.state;
        this.setState({ addPart: !addPart })
        if(isEditingPart) {
            this.setState({ isEditingPart: !isEditingPart, selectedPartToEdit: {} });
        }
    }


    componentDidMount(){
        const { currentUser } = this.props;
        this.myGarageMounted = !!currentUser.id;
        this.machineIdProps = !!this.props.match.params.id;

        if (this.myGarageMounted && this.machineIdProps) {
            this.getAllMachinesById(currentUser.id);
            this.getAllPartTypes();
            this.getSingleMachine(this.props.match.params.id);
            this.setState({ selectedMachineId: this.props.match.params.id * 1 });

        } else if (this.myGarageMounted) {
            this.getAllMachinesById(currentUser.id);
            this.getAllPartTypes();
        }
    }

    render(){
        const machines = [...this.state.machines];

        const partTypes = [...this.state.partTypes];

        const machineParts = [...this.state.machineParts];

        const { currentUser } = this.props;

        const {
                selectedMachine,
                selectedPartToEdit,
                selectedPartId,
                modal,
                isEditing,
                selectedPartType,
                selectedMachineId,
                showParts,
                dropdownParts,
                addPart,
                isEditingPart,
                addEditServiceModal,
                isEditingService,
                isGarage,
            } = this.state;

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
                    <MachineCard
                        selectedMachine = {selectedMachine}
                        editMachine = {this.editMachine}
                        deleteMachine = {this.deleteMachine}
                        showPartsDiv = {this.showPartsDiv}
                        showAddEditService = {this.showAddEditService}
                        goToServiceHistory = {this.goToServiceHistory}
                    />
                  );
            }
            return<div></div>
        }

        const makePartsDiv = () => {
            if(showParts) {
                return (
                    <div className="mt-5">
                        <MachinePartsDropdown
                            partTypes = {partTypes}
                            machineParts = {machineParts}
                            selectedPartType = {selectedPartType}
                            selectPart = {this.selectPart}
                            dropdownParts = {dropdownParts}
                            selectPartType = {this.selectPartType}
                            selectedPart = {selectedPartId}
                            isGarage = {isGarage}
                        />
                        <div className="text-center">
                            <button className="bttn-pill add-btn mx-auto mb-2" onClick={this.showAddParts} title="Add Parts">
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>
                    </div>
                )
            }
        }

        return(
            
            <div className="myGarage mx-auto animated fadeIn">
                <h1 className="text-center">{currentUser.name}'s Garage</h1>
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
                <AddEditPart
                    partTypes={partTypes}
                    selectedMachineId={selectedMachineId}
                    isEditingPart={isEditingPart}
                    currentUser={currentUser}
                    getPartsByMachine = {this.getPartsByMachine}
                    addPart={addPart}
                    showAddParts= {this.showAddParts}
                    selectedPartToEdit = {selectedPartToEdit}
                    deletePart = {this.deletePart}
                    machineParts={machineParts}
                />
                <Service
                    selectedMachineId={selectedMachineId}
                    currentUser={currentUser}
                    showAddEditService={this.showAddEditService}
                    selectedMachine={selectedMachine}
                    addEditServiceModal={addEditServiceModal}
                    partTypes = {partTypes}
                    machineParts = {machineParts}
                    routeToServiceHistory={this.routeToServiceHistory}
                    isEditing={isEditingService}
                />
            </div>
        )
    }
}

export default MyGarage;
