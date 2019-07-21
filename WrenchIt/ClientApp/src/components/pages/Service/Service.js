import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import partRequests from '../../../helpers/data/partRequests';


class Service extends React.Component{
    serviceMounted = false;

    state = {
        selectedMachine: {},
        machineParts: [],
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
        return(
            <div>Service Page</div>
        )
    }
}

export default Service;