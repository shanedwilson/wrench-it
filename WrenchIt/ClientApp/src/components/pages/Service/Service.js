import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import partRequests from '../../../helpers/data/partRequests';
import MachineCard from '../../MachineCard/MachineCard';
import AddEditService from'../../AddEditService/AddEditService';

class Service extends React.Component{
    serviceMounted = false;

    state = {
        selectedMachine: {},
        machineParts: [],
        isService: true,
        modal: false,
        isEditing: false,
    }

    getPartsByMachine = (id) => {
        partRequests.getPartsByMachineId(id)
            .then((machineParts) => {
                this.setState({ machineParts });
            });
      }

    getSingleMachineById = (id) => {
        machineRequests.getSingleMachine(id)
        .then((machine) => {
            this.setState({ selectedMachine: machine.data });
            this.getPartsByMachine(machine.data.id);
        })
    }

    toggleServiceModal = () => {
        const { modal } = this.state;
        this.setState({ modal: !modal });
    }

    componentDidMount(){
        const { currentUser } = this.props;
        this.serviceMounted = !!currentUser.id;
        const machineId = this.props.match.params.id

        console.log(machineId);

        if (this.serviceMounted) {
            this.getSingleMachineById(machineId * 1);
        }
    }

    render(){
        const { selectedMachine, isService, isEditing, modal } = this.state;

        return(
            <div>
                <MachineCard
                    selectedMachine = {selectedMachine}
                    isService = {isService}
                    toggleServiceModal = {this.toggleServiceModal}
                />
                <AddEditService
                    isEditing = {isEditing}
                    modal = {modal}
                    selectedMachine ={selectedMachine}
                    toggleServiceModal = {this.toggleServiceModal}
                />
            </div>
        )
    }
}

export default Service;