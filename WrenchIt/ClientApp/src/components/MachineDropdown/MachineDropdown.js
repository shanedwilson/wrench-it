import React from 'react';

class MachineDropdown extends React.Component{

    render(){
        const { machines, selectedMachineId, selectMachine, inactiveMachines } = this.props;

        const makeMachineDropdownItems = () => {
            return(
                machines.map((machine, i) => (
                    <option key={i} value={machine.id}>
                        {machine.year} {machine.make} {machine.model} {machine.trim}
                    </option>))
            )
        }

        const makeInactiveMachinesDropdown = () => {
            return(
                inactiveMachines.map((machine, i) => (
                    <option key={i} value={machine.id}>
                        {machine.year} {machine.make} {machine.model} {machine.trim}
                    </option>))
            )
        }

        return(
            <div className="text-center mt-5">
                <select name="machines" required className="custom-select w-50" value={selectedMachineId}
                        onChange={(event) => { selectMachine(event) }}>
                <option value="">Select Your Machine</option>
                    {makeMachineDropdownItems()}
                <option disabled>________________</option>
                <option disabled>Machines Of Yore</option>
                <option disabled>________________</option>
                    {makeInactiveMachinesDropdown()}
                </select>
            </div>
        )
    }
}

export default MachineDropdown;
