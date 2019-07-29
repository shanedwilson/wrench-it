import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import serviceRequests from '../../../helpers/data/serviceRequests';

import './Alerts.scss';

class Alerts extends React.Component{
    alertMounted = false;

    state = {
        machines: [],
        services: [],
        alertServices: [],
    }

    garageView = (e) => {
        const machineId = e.target.id
        this.props.history.push(`/mygarage/${machineId}`);
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
            let dateChecked = this.checkDates(new Date(s.ServiceDate));
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

        const { currentUser } = this.props;

        const formatMDYDate = (date) => {
            const inputDate = new Date(date);
            const month = inputDate.getMonth() + 1;
            const day = inputDate.getDate();
            const year = inputDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
          };

        const makeAlerts = () => {
            if (alertServices.length === 0) {
                return (
                    <div>You have no alerts today.</div>
                );
            }
            return (
                alertServices.map((as,index) => 
                    <div className="mt-5" onClick={this.garageView} key={as.Id} id={as.MachineId}>Your {as.year} {as.make} {as.model} was last serviced on {formatMDYDate(as.ServiceDate)}.</div>
                )
            )
        };

        return(
            <div className="alerts-container mx-auto">
                <h1 className="text-center">{currentUser.name}'s Service Alerts</h1>
                <div className="text-center">{makeAlerts()}</div>
            </div>
        )
    }
}

export default Alerts;
