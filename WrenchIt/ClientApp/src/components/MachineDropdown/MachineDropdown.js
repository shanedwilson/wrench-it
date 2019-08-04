import React from 'react';
import PropTypes from 'prop-types';

import './MachineDropdown.scss';

class MachineDropdown extends React.Component {
    static propTypes = {
      machines: PropTypes.array,
      selectedMachineId: PropTypes.number,
      selectMachine: PropTypes.func,
      inactiveMachines: PropTypes.array,
    }

    render() {
      const {
        machines, selectedMachineId, selectMachine, inactiveMachines,
      } = this.props;

      const makeMachineDropdownItems = () => (
        machines.map((machine, i) => (
                    <option key={i} value={machine.id}>
                        {machine.year} {machine.make} {machine.model} {machine.trim}
                    </option>))
      );

      const makeInactiveMachinesDropdown = () => (
        inactiveMachines.map((machine, i) => (
                    <option key={i} value={machine.id}>
                        {machine.year} {machine.make} {machine.model} {machine.trim}
                    </option>))
      );

      return (
            <div className="text-center mt-5">
                <select name="machines" required className="custom-select w-50" value={selectedMachineId}
                        onChange={(event) => { selectMachine(event); }}>
                <option value="">Select Your Machine</option>
                    {makeMachineDropdownItems()}
                <option className="upper-border"disabled></option>
                <option disabled>Machines Of Yore</option>
                <option className="lower-border" disabled></option>
                    {makeInactiveMachinesDropdown()}
                </select>
            </div>
      );
    }
}

export default MachineDropdown;
