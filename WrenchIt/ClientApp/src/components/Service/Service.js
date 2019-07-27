import React from 'react';
import machineRequests from '../../helpers/data/machineRequests';
import servicePartRequests from '../../helpers/data/servicePartRequests';
import AddEditService from'../AddEditService/AddEditService';
import {
    Modal,
    ModalHeader,
    ModalBody,
  } from 'reactstrap';

class Service extends React.Component{
    serviceMounted = false;

    state = {
        selectedParts: [],
        dropdownParts: [],
        isService: true,
        selectedPartType: 1000,
        SelectedMachineId: 0,
        selectedPart: 0,
        selectedService: {},
    }

    toggleEvent = () => {
        this.props.showAddEditService();
    }

    getSingleMachineById = (id) => {
        machineRequests.getSingleMachine(id)
        .then((machine) => {
            this.setState({ selectedMachine: machine.data });
            this.getPartsByMachine(machine.data.id);
        })
    }

    selectPartType = (e) => {
        const selectedPartType = e.currentTarget.value * 1;
        const { machineParts }= this.props;
        let dropdownParts = [];
        machineParts.forEach(mp => {
            if(mp.typeId === selectedPartType + 1){
                dropdownParts.push(mp);
            }
        });
        this.setState({ dropdownParts, selectedPartType: selectedPartType });
    }

    selectPart = (e) => {
        const { machineParts }= this.props;
        const selectedParts = [...this.state.selectedParts]
        const partId = e.target.value * 1;
        const filteredParts = machineParts.filter(part => part.id === partId);
        selectedParts.push(filteredParts[0]);
        this.setState({ selectedParts, selectedPart: 0, selectedPartType:1000, dropdownParts: [] });
    }

    removePart = (id) => {
        console.log('CLICKED!!!');
        const {selectedParts} = this.state;
        const {isEditing, serviceParts} = this.props;
        if(!isEditing) {
            selectedParts.forEach((sp, i) =>{
                const index = selectedParts.findIndex(sp => sp.id === id);
                if(index > -1){
                    selectedParts.splice(index, 1);
                    this.setState({ selectedParts })
                };
            });
        }
        serviceParts.forEach((sp, i) =>{
            if (sp.partId === id) {
                servicePartRequests.deleteServicePart(sp.id);
            }
            const index = selectedParts.findIndex(sp => sp.id === id);
            if(index > -1){
                selectedParts.splice(index, 1);
                this.setState({ selectedParts })
            };
        });
    }

    componentDidMount(){
        const { currentUser, selectedServiceId, isDetail } = this.props;
        this.serviceMounted = !!currentUser.id;

        // if (this.serviceMounted && isDetail) {
        //     this.getPartsByServiceId(selectedServiceId)
        //         .then((selectedParts) => {
        //             this.setState({ selectedParts })
        //         })
        // }
    }

    componentWillReceiveProps(props) {
        const { isDetail, selectedParts } = props;
        if (isDetail) {
            this.setState({
            selectedParts,
            });
        }
    }

    render(){
        const { selectedPartType, selectedParts, selectedPart } = this.state;

        const dropdownParts = [...this.state.dropdownParts];

        const {
            currentUser,
            addEditServiceModal,
            selectedMachine,
            partTypes,
            isDetail,
            selectedService,
            routeToServiceHistory,
            deleteService,
            editService,
            isEditing,
        } = this.props;

        const makeHeader = () => {
            if (isEditing) {
              return (
                <div className="text-center">Edit Service For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
              );
            }  else if (isDetail) {
                return (
                  <div className="text-center">Service For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
                );
            }
            return (
              <div className="text-center">Add Service For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
            );
          };

        return(
            <div className="w-75 mx-auto">
                <Modal isOpen={addEditServiceModal} className="modal-lg">
                    <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{makeHeader()}</ModalHeader>
                    <ModalBody className="text-center modal-body" id="service-modal">
                        <AddEditService
                            isEditing = {isEditing}
                            selectedMachine ={selectedMachine}
                            currentUser = {currentUser}
                            selectedParts = {selectedParts}
                            removePart = {this.removePart}
                            partTypes = {partTypes}
                            selectPartType = {this.selectPartType}
                            selectedPartType = {selectedPartType}
                            dropdownParts = {dropdownParts}
                            selectPart = {this.selectPart}
                            selectedPart = {selectedPart}
                            isDetail = {isDetail}
                            selectedService = {selectedService}
                            routeToServiceHistory = {routeToServiceHistory}
                            deleteService={deleteService}
                            editService={editService}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Service;