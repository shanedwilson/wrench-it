import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../helpers/formatDate';

class ServiceHistoryTable extends React.Component {
    static propTypes = {
      garageView: PropTypes.func,
      machineServices: PropTypes.array,
      showAddEditService: PropTypes.func,
      getSelectedService: PropTypes.func,
      alertServices: PropTypes.array,
      isAlerts: PropTypes.bool,
    }

    garageViewEvent = (e) => {
      const machineId = e.currentTarget.id * 1;
      this.props.garageView(machineId);
    }

    render() {
      const {
        machineServices, showAddEditService, getSelectedService, alertServices, isAlerts,
      } = this.props;

      const createMachineServices = () => {
        if (isAlerts === false) {
          return (
            machineServices.map(ms => (
                        <tr id={ms.id} key={ms.id} className="" onClick={(e) => { showAddEditService(e); getSelectedService(e); }}>
                            <td className="service-date">{formatDate.formatMDYDate(ms.serviceDate)}</td>
                            <td className="service-notes">{ms.notes}</td>
                        </tr>
            ))
          );
        }
        return (
          alertServices.map(as => <tr className="mt-5" onClick={this.garageViewEvent} key={as.Id} id={as.MachineId}>
                        <td className="service-machine">{as.year} {as.make} {as.model}</td>
                        <td className="service-date">{formatDate.formatMDYDate(as.ServiceDate)}</td>
                    </tr>)
        );
      };

      const createTableHeader = () => {
        if (isAlerts === false) {
          return (
                    <tr>
                    <th scope="col">Service Date</th>
                    <th scope="col">Notes</th>
                </tr>
          );
        }
        return (
                <tr>
                <th scope="col">Machine</th>
                <th scope="col">Out Of Date Service</th>
            </tr>
        );
      };

      return (
                <div className="table-div mx-auto">
                    <table className="table table-hover text-center">
                        <thead>
                            {createTableHeader()}
                        </thead>
                        <tbody>
                            {createMachineServices()}
                        </tbody>
                    </table>
                </div>
      );
    }
}

export default ServiceHistoryTable;
