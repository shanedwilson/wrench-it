import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import serviceRequests from '../../../helpers/data/serviceRequests';

class Alerts extends React.Component{
    alertMounted = false;

    state = {
        machines: [],
        services: [],
    }

    getAllServicesByOwnerId = () => {
        const { currentUser } = this.props;
        const ownerId = currentUser.id;
        serviceRequests.getAllServicesByOwnerId(ownerId)
            .then((services) => {
                this.setState({ services });
            });
    }

    getAllMachinesById = (id) => {
        machineRequests.getAllMachinesById(id)
          .then((machinesObject) => {
            this.setState({ machines: machinesObject })
            this.getAllServicesByOwnerId(id);
          });
      }

    componentDidMount(){
        const { currentUser } = this.props;
        this.alertMounted = !!currentUser.id;
        if (this.alertMounted) {
            this.getAllMachinesById(currentUser.id);
        }
    }

    render(){
        return(
            <h1>Alerts</h1>
        )
    }
}

export default Alerts;
