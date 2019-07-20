import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';

import './MyGarage.scss';

class MyGarage extends React.Component{
    myGarageMounted = false;

    state = {
        machines: [],
        selectedMachine: 0,
    }

    getAllMachinesById = (id) => {
        machineRequests.getAllMachinesById(id)
          .then((machines) => {
            this.setState({ machines });
          });
      }

    selectMachineType = (e) => {
        this.setState({ selectedMachine: e.target.value });
    }      

    componentDidMount(){
        const { currentUser } = this.props;
        this.myGarageMounted = !!currentUser.id;
        if (this.myGarageMounted) {
            this.getAllMachinesById(currentUser.id);
        }
    }

    render(){
        const machines = [...this.state.machines];

        const { selectedMachine } = this.state;

        const makeDropdown = () => {
            let counter = 0;
            return (
                        <div>
                            <select name="machines" required className="custom-select" value={selectedMachine}
                                    onChange={(event) => { this.selectMachine(event) }}>
                            <option value="">Select Your Machine</option>
                            {
                                machines.map(machine => (<option key={counter++}value={machine.Id}>{machine.year}</option>))
                            }
                            </select>
                        </div>
                    );
        };
        return(
            
            <div className="myGarage mx-auto">
                <h1 className="text-center">My Garage</h1>
                {makeDropdown()}
            </div>
        )
    }
}

export default MyGarage;
