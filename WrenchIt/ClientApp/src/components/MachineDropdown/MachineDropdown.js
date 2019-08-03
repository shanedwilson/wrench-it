import React from 'react';

class MachineDropdown extends React.Component{
    render(){
        const { machines, selectedMachineId, selectMachine } = this.props;
        return(
            <div className="text-center mt-5">
            <select name="machines" required className="custom-select w-50" value={selectedMachineId}
                    onChange={(event) => { selectMachine(event) }}>
            <option value="">Select Your Machine</option>
            {
                machines.map((machine, i) => (
                    <option key={i} value={machine.id}>
                        {machine.year} {machine.make} {machine.model} {machine.trim}
                    </option>))
            }
            </select>
        </div>
        )
    }
}

export default MachineDropdown;
