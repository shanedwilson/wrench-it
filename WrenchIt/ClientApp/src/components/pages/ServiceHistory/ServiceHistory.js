import React from 'react';
import Service from '../../Service/Service';
import ServiceHistoryTable from '../ServiceHistoryTable/ServiceHistoryTable';
import serviceRequests from '../../../helpers/data/serviceRequests';
import machineRequests from '../../../helpers/data/machineRequests';
import partRequests from '../../../helpers/data/partRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';
import servicePartRequests from '../../../helpers/data/servicePartRequests';

import './ServiceHistory.scss';

class ServiceHistory extends React.Component {
    state = {
        machineServices: [],
        selectedMachine: {},
        selectedServiceId: 0,
        isDetail: false,
        addEditServiceModal: false,
        selectedService: {},
        partTypes: [],
        machineParts: [],
        selectedParts: [],
        serviceParts: [],
        isEditing: false,
        isAlerts: false,
    }

    showAddEditService = (e) => {
        const { isDetail, addEditServiceModal, isEditing } = this.state;
        if(isEditing){
            this.setState({ isDetail: !isDetail, addEditServiceModal: !addEditServiceModal, isEditing: !isEditing });
        }
        this.setState({ isDetail: !isDetail, addEditServiceModal: !addEditServiceModal });
    }

    getMachineById = (machineId) => {
        machineRequests.getSingleMachine(machineId)
        .then((machine) => {
            this.setState({ selectedMachine: machine.data});
        });
    }

    getSelectedService = (e) => {
        const selectedServiceId = e.currentTarget.id * 1;
        serviceRequests.getSingleService(selectedServiceId)
            .then((selectedService) => {
                this.setState({
                    selectedService: selectedService.data,
                    selectedServiceId,
                });
            });
        this.getPartsByServiceId(selectedServiceId);
    }

    getAllParts = () => {
        const parts = [...this.state.parts];
        const partTypes = [...this.state.partTypes];
        partRequests.getAllParts()
        .then((parts) => {
            this.setState({ parts });
        });
        parts.map(p => (
            partTypes.map((pt, i) => pt.typeId === i +1 (
                p.typeName = pt
            ))
        ))
    }

    getAllPartTypes = () => {
        partTypeRequests.getAllPartTypes()
          .then((partTypes) => {
            this.setState({ partTypes });
          });
      }

    getPartsByMachine = (id) => {
        partRequests.getPartsByMachineId(id)
            .then((machineParts) => {
                this.setState({ machineParts });
            });
      }

      getServicePartsByServiceId = (id) => {
          servicePartRequests.getAllServicePartsByServiceId(id)
          .then((serviceParts) => {
              this.setState({ serviceParts });
          })
      }

    getPartsByServiceId = (id) => {
        partRequests.getPartsByServiceId(id)
        .then((selectedParts) => {
            this.setState({ selectedParts });
            this.getServicePartsByServiceId(id);
        })
    }

    getServicesByMachineId = (machineId) => {
        serviceRequests.getAllServicesByMachineId(machineId)
        .then((machineServices) => {
            this.setState({ machineServices });
        });
    }

    deleteService = () => {
        const machineId = this.props.match.params.id
        const serviceId = this.state.selectedServiceId;
        serviceRequests.deleteService(serviceId)
            .then(() => {
                this.showAddEditService();
                this.getServicesByMachineId(machineId);
            })
    }

    editService = () => {
        const machineId = this.props.match.params.id
        const {isEditing} = this.state;
        if(isEditing){
            this.showAddEditService()
            this.getServicesByMachineId(machineId)
        }
        this.setState({isEditing: !isEditing});
    }

    componentDidMount() {
        const { currentUser } = this.props;
        const machineId = this.props.match.params.id
        this.serviceMounted = !!currentUser.id;
        if (this.serviceMounted) {
            this.getServicesByMachineId(machineId);
            this.getPartsByMachine(machineId);
            this.getAllPartTypes();
            this.getMachineById(machineId);
        }
    }

    render() {
        const machineServices = [...this.state.machineServices];

        const selectedMachine = {...this.state.selectedMachine};

        const selectedService = {...this.state.selectedService};

        const partTypes = [...this.state.partTypes];

        const machineParts = [...this.state.machineParts];

        const selectedParts = [...this.state.selectedParts];

        const serviceParts = [...this.state.serviceParts];

        const { currentUser } = this.props;

        const {
            isDetail,
            selectedServiceId,
            addEditServiceModal,
            isEditing,
            isAlerts,
        } = this.state;

        return(
            <div>
                <div className="mt-5">
                <h1 className="text-center mb-5">Services For {currentUser.name}'s {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</h1>
                    <ServiceHistoryTable 
                        currentUser={currentUser}
                        selectedMachine={selectedMachine}
                        machineServices={machineServices}
                        showAddEditService={this.showAddEditService}
                        getSelectedService={this.getSelectedService}
                        isAlerts={isAlerts}
                    />
                </div>
                <Service
                    isDetail={isDetail}
                    selectedServiceId={selectedServiceId}
                    selectedMachine={selectedMachine}
                    addEditServiceModal={addEditServiceModal}
                    currentUser={currentUser}
                    showAddEditService={this.showAddEditService}
                    selectedService={selectedService}
                    partTypes = {partTypes}
                    machineParts = {machineParts}
                    selectedParts={selectedParts}
                    deleteService={this.deleteService}
                    editService={this.editService}
                    isEditing={isEditing}
                    serviceParts={serviceParts}
                    getPartsByServiceId={this.getPartsByServiceId}
                />
            </div>
        )
    }
}

export default ServiceHistory;
