import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';

class Service extends React.Component{
    serviceMounted = false;

    state = {
        selectedMachine: {},
    }

    getSingleMachineById = (id) => {
        machineRequests.getSingleMachine(id)
        .then((machine) => {
            this.setState({ selectedMachine: machine.data })
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