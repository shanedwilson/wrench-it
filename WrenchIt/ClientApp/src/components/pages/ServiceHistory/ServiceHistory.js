import React from 'react';
import Service from '../../Service/Service';
import serviceRequests from '../../../helpers/data/serviceRequests';
import machineRequests from '../../../helpers/data/machineRequests';
import partRequests from '../../../helpers/data/partRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';

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
    }

    showAddEditService = (e) => {
        const { isDetail, addEditServiceModal } = this.state;
        this.setState({ isDetail: !isDetail, addEditServiceModal: !addEditServiceModal });
    }

    getSelectedService = (e) => {
        const selectedServiceId = e.currentTarget.id * 1;
        serviceRequests.getSingleService(selectedServiceId)
            .then((selectedService) => {
                this.setState({
                    selectedService: selectedService.data,
                    selectedServiceId,
                })
            })
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

    componentDidMount() {
        const { currentUser } = this.props;
        const machineId = this.props.match.params.id
        this.serviceMounted = !!currentUser.id;
        if (this.serviceMounted) {
            serviceRequests.getAllServicesByMachineId(machineId)
            .then((machineServices) => {
                this.setState({ machineServices });
            });
            machineRequests.getSingleMachine(machineId)
            .then((machine) => {
                this.setState({ selectedMachine: machine.data});
            });
            this.getPartsByMachine(machineId);
            this.getAllPartTypes();
        }
    }

    render() {
        const machineServices = [...this.state.machineServices];

        const selectedMachine = {...this.state.selectedMachine};

        const selectedService = {...this.state.selectedService};

        const { currentUser } = this.props;

        const {
            isDetail,
            selectedServiceId,
            addEditServiceModal,
        } = this.state;

        const formatMDYDate = (date) => {
            const inputDate = new Date(date);
            const month = inputDate.getMonth() + 1;
            const day = inputDate.getDate();
            const year = inputDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
          };

        const createMachineServices = () => {
            return(
                machineServices.map(ms => (
                    <tr id={ms.id} key={ms.id} className="renting-item" onClick={(e) => {this.showAddEditService(e); this.getSelectedService(e) }}>
                        <td className="service-date">{formatMDYDate(ms.serviceDate)}</td>
                        <td className="service-notes">{ms.notes}</td>
                    </tr>
                    )
                )
            )
        }

        return(
            <div>
                <div className="table-div mx-auto">
                    <div className="mt-5">
                        <h1 className="text-center mb-5">Services For {currentUser.name}'s {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</h1>
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Service Date</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {createMachineServices()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Service
                    isDetail={isDetail}
                    selectedServiceId={selectedServiceId}
                    selectedMachine={selectedMachine}
                    addEditServiceModal={addEditServiceModal}
                    currentUser={currentUser}
                    showAddEditService={this.showAddEditService}
                    selectedService={selectedService}
                />
            </div>
        )
    }
}

export default ServiceHistory;
