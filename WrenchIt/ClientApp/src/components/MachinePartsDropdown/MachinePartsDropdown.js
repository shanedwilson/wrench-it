import React from 'react';
import PropTypes from 'prop-types';

class MachinePartsDropdown extends React.Component {
    static propTypes = {
        partTypes: PropTypes.array,
        machineParts: PropTypes.array,
        selectedPartType: PropTypes.number,
    }

    render(){
        const {machineParts, partTypes, selectedPartType} = this.props;

        const populatePartsDropdown = (index) => {
            const ptIndex = index + 1;
            let objectArray = [];
            machineParts.forEach(mp => {
                if(mp.typeId === ptIndex){
                    objectArray.push(mp);
                }
            })
            return(
                objectArray.map(o => (
                    <option key={o.id} value={o.id}>
                    {o.brand} {o.partNumber}
                </option>  
                ))
            )
        }
    
        const makePartsDropdowns = () => {
            return (
                <div className="parts text-center mt-5">
                    {
                        partTypes.map((partType, index) => (
                            <select name={partType} required className="custom-select w-50 mb-3" value={selectedPartType}
                                    onChange={(event) => { this.selectMachine(event) }}>
                                <option value="">Select {partType}</option>
                                {populatePartsDropdown(index)}
                            </select>
                        ))
                    }
                </div>
            );  
        };  

        return(
            <div>
            {makePartsDropdowns()}
            </div>
        )
    }
}

export default MachinePartsDropdown;
