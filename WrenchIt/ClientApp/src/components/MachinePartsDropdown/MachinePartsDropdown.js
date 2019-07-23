import React from 'react';
import PropTypes from 'prop-types';

class MachinePartsDropdown extends React.Component {
    static propTypes = {
        partTypes: PropTypes.array,
        machineParts: PropTypes.array,
        selectedPartType: PropTypes.string,
        selectPart: PropTypes.func,
    }

    selectPartEvent = (e) => {
        this.props.selectPart(e);
    }

    selectPartTypeEvent = (e) => {
        this.props.selectPartType(e);
    }

    render(){
        const {machineParts, partTypes, selectedPartType } = this.props;

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
    
        const makePartTypeDropdown = () => {
            return (
                    partTypes.map((partType, index) => (
                        <option key={index} value={partType} id={index}>Select {partType}</option>
                    ))
            );  
        };  

        return(
            <div>
                <select  name="part-type-dropdown" value={selectedPartType} required className="custom-select w-25 mb-3 mr-2"
                        onChange={(event) => { this.selectPartTypeEvent(event) }}>
                    <option value="">Select Part Type</option>
                    {makePartTypeDropdown()}
                </select>            
            </div>
        )
    }
}

export default MachinePartsDropdown;
