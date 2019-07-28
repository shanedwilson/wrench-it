import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import serviceRequests from '../../../helpers/data/serviceRequests';

class Alerts extends React.Component{
    alertMounted = false;

    state = {
        machines: [],
        services: [],
        alertServices: [],
    }

    checkDates = (serviceDate) => {
        const x = 3;
        const currentDate = new Date();
        const checkedDate = serviceDate.setMonth(serviceDate.getMonth() + x);
        if(currentDate >= checkedDate){
            return(true)
        };
    };

    makeAlertServices = () => {
        const alertServices = [...this.state.alertServices];
        const services = [...this.state.services];
        services.forEach(s => {
            let dateChecked = this.checkDates(new Date(s.serviceDate));
            if(dateChecked){
                alertServices.push(s);
            }
            this.setState({ alertServices });
        })
    }

    getAllServicesByOwnerId = () => {
        const { currentUser } = this.props;
        const ownerId = currentUser.id;
        serviceRequests.getAllServicesByOwnerId(ownerId)
            .then((services) => {
                this.setState({ services });
                this.makeAlertServices();
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

    render() {
        const alertServices = [...this.state.alertServices];

        const machines = [...this.state.machines];

        const makeAlerts = () => {
            if (alertServices.length === 0) {
                return (
                    <div>You have no alerts today.</div>
                );
            }
            return (
                alertServices.map(as => 
                    <div>Last serviced on {as.serviceDate}.</div>
                )
            )
        };

        return(
            <div>
                <h1>Alerts</h1>
                <div>{makeAlerts()}</div>
            </div>
        )
    }
}

export default Alerts;
