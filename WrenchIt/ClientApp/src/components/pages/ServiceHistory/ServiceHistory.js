import React from 'react';
import serviceRequests from '../../../helpers/data/serviceRequests';
import machineRequests from '../../../helpers/data/machineRequests';

import './ServiceHistory.scss';

class ServiceHistory extends React.Component {
    state = {
        machineServices: [],
        selectedMachine: {},
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
                    <tr id={ms.id} className="renting-item" onClick={this.toggleModalEvent}>
                        <td className="service-date">{formatMDYDate(ms.serviceDate)}</td>
                        <td className="service-notes">{ms.notes}</td>
                    </tr>
                    )
                )
            )
        }

        return(
            <div>
                <div className="w-60 mt-5">
                    <h1 className="text-center">Services For {currentUser.name}'s {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</h1>
                    <table className="table table-hover w-60 ">
                        <thead>
                            <tr>
                                <th scope="col">Service Date</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <h1>FUCK</h1>
                            {createMachineServices()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ServiceHistory;
