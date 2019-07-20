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

    selectMachine = (e) => {
        console.log(e.target.value);
        this.setState({ selectedMachine: e.target.value * 1 });
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
            return (
                        <div>
                            <select name="machines" required className="custom-select" value={selectedMachine}
                                    onChange={(event) => { this.selectMachine(event) }}>
                            <option value="">Select Your Machine</option>
                            {
                                machines.map(machine => (
                                    <option key={machine.id}value={machine.id}>
                                        {machine.year} {machine.make} {machine.model} {machine.trim}
                                    </option>))
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
