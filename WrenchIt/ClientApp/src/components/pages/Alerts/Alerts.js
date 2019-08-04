import React from 'react';
import PropTypes from 'prop-types';

import ServiceHistoryTable from '../../ServiceHistoryTable/ServiceHistoryTable';
import machineRequests from '../../../helpers/data/machineRequests';
import serviceRequests from '../../../helpers/data/serviceRequests';

import './Alerts.scss';

class Alerts extends React.Component {
    alertMounted = false;

    static propTypes = {
      currentUser: PropTypes.object,
    }

    state = {
      machines: [],
      services: [],
      alertServices: [],
      isAlerts: true,
    }

    garageView = (machineId) => {
      this.props.history.push(`/mygarage/${machineId}`);
    }

    checkDates = (serviceDate) => {
      const x = 3;
      const currentDate = new Date();
      const checkedDate = serviceDate.setMonth(serviceDate.getMonth() + x);
      if (currentDate >= checkedDate) {
        return (true);
      }
      return (false);
    };

    makeAlertServices = () => {
      const alertServices = [...this.state.alertServices];
      const services = [...this.state.services];
      services.forEach((s) => {
        const dateChecked = this.checkDates(new Date(s.ServiceDate));
        if (dateChecked) {
          alertServices.push(s);
        }
        this.setState({ alertServices });
      });
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
          this.setState({ machines: machinesObject });
          this.getAllServicesByOwnerId(id);
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.alertMounted = !!currentUser.id;
      if (this.alertMounted) {
        this.getAllMachinesById(currentUser.id);
      }
    }

    render() {
      const alertServices = [...this.state.alertServices];

      const { isAlerts } = this.state;

      const { currentUser } = this.props;

      const makeAlerts = () => {
        if (alertServices.length === 0) {
          return (
                    <h3>You have no alerts today.</h3>
          );
        }
        return (
                <ServiceHistoryTable
                    alertServices={alertServices}
                    isAlerts={isAlerts}
                    currentUser={currentUser}
                    garageView={this.garageView}
                />
        );
      };

      return (
            <div className="alerts-container mx-auto animated fadeIn">
                <h1 className="text-center mb-5">{currentUser.name}'s Service Alerts</h1>
                <div className="text-center">{makeAlerts()}</div>
            </div>
      );
    }
}

export default Alerts;
