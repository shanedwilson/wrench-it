import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';

import './MyGarage.scss';

class MyGarage extends React.Component{
    myGarageMounted = false;

    state = {
        machines: [],
        selectedMachineId: 0,
        selectedMachine: {},
    }

    getAllMachinesById = (id) => {
        machineRequests.getAllMachinesById(id)
          .then((machines) => {
            this.setState({ machines });
          });
      }

      getSingleMachine = (id) => {
        machineRequests.getSingleMachine(id)
          .then((machine) => {
            this.setState({ selectedMachine: machine.data });
          });
      }


    selectMachine = (e) => {
        console.log(e.target.value);
        this.setState({ selectedMachineId: e.target.value * 1 });
        this.getSingleMachine(e.target.value * 1);
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
                    <div className="text-center mt-5">
                        <select name="machines" required className="custom-select w-50" value={selectedMachine}
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

        const makeMachineCard = () => {
            if(selectedMachine.id){
                return (
                        <div className="d-flex justify-content-center">
                            <div className="machine-card border border-dark rounded animated fadeIn w-50 mt-5 text-center" id={selectedMachine.id}>
                            <h3 className="text-center profile-header">{selectedMachine.year} {selectedMachine.make} {selectedMachine.model} {selectedMachine.trim}</h3>
                            <div className="ml-1">Oil Type: {selectedMachine.oilType}</div>
                            <div className="ml-1">Oil Quantity: {selectedMachine.oilQuantity} Quarts</div>
                            <div className="ml-1">Tire Size: {selectedMachine.tireSize}</div>
                            <div className="ml-1">Tire Pressure: {selectedMachine.tirePressure}</div>
                            <div className="ml-1">Service Interval: {selectedMachine.serviceInterval}</div>
                            </div>
                        </div>
                  );
            }
            return<div></div>
        }
        return(
            
            <div className="myGarage mx-auto">
                <h1 className="text-center">My Garage</h1>
                <div className="w-75 mx-auto">
                    {makeDropdown()}
                    {makeMachineCard()}
                </div>
            </div>
        )
    }
}

export default MyGarage;
