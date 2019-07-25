import React from 'react';
import serviceRequests from '../../../helpers/data/serviceRequests';
import machineRequests from '../../../helpers/data/machineRequests';

import './ServiceHistory.scss';

class ServiceHistory extends React.Component {
    state = {
        machineServices: [],
        selectedMachine: {},
    }

    toggleServiceModal = (e) => {
        const partId = e.currentTarget.id * 1;
        this.props.history.push(`/service/detail/${partId}`);
    }

    componentDidMount() {
        const { currentUser } = this.props;
        const machineId = this.props.match.params.id
        this.serviceMounted = !!currentUser.id;
        if (this.serviceMounted) {
            serviceRequests.getAllServicesByMachineId(machineId)
            .then((machineServices) => {
                this.setState({ machineServices });
            })
            machineRequests.getSingleMachine(machineId)
            .then((machine) => {
                this.setState({ selectedMachine: machine.data});
            });
        }
    }

    render() {
        const machineServices = [...this.state.machineServices];

        const selectedMachine = {...this.state.selectedMachine};

        const { currentUser } = this.props;

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
                    <tr id={ms.id} key={ms.id} className="renting-item" onClick={this.toggleServiceModal}>
                        <td className="service-date">{formatMDYDate(ms.serviceDate)}</td>
                        <td className="service-notes">{ms.notes}</td>
                    </tr>
                    )
                )
            )
        }

        return(
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
        )
    }
}

export default ServiceHistory;
