import React from 'react';
import PropTypes from 'prop-types';

class MachinePartsDropdown extends React.Component {
    static propTypes = {
        partTypes: PropTypes.array,
        machineParts: PropTypes.array,
        selectedPartType: PropTypes.number,
        selectPart: PropTypes.func,
    }

    selectPartEvent = (e) => {
        this.props.selectPart(e);
    }

    render(){
        const {machineParts, partTypes } = this.props;

        const populatePartsDropdown = (index) => {
            const ptIndex = index + 1;
            let parts = [];
            machineParts.forEach(mp => {
                if(mp.typeId === ptIndex){
                    parts.push(mp);
                }
            })
            return(
                parts.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.brand} {p.partNumber}
                    </option>  
                ))
            )
        }
    
        const makePartsDropdowns = () => {
            return (
                <div className="parts text-center mt-2 w-60">
                    {
                        partTypes.map((partType, index) => (
                            <select key={index} name={partType} value={this.props[partType]} required className="custom-select w-25 mb-3 mr-2"
                                    onChange={(event) => { this.selectPartEvent(event) }}>
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
