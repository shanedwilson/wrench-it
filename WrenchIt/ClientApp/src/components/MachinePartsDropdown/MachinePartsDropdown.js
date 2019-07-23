import React from 'react';
import PropTypes from 'prop-types';

class MachinePartsDropdown extends React.Component {
    static propTypes = {
        partTypes: PropTypes.array,
        dropdownParts: PropTypes.array,
        selectedPartType: PropTypes.string,
        selectPart: PropTypes.func,
        selectPartType: PropTypes.func,
    }

    selectPartEvent = (e) => {
        this.props.selectPart(e);
    }

    selectPartTypeEvent = (e) => {
        this.props.selectPartType(e);
    }

    render(){
        const { partTypes, selectedPartType, selectedPart, dropdownParts } = this.props;

        const makePartsDropDown = () => {
            if(dropdownParts.length > 0) {
                return (
                    <select  name="parts-dropdown" value={selectedPart} required className="custom-select w-25 mb-3 mr-2"
                        onChange={(event) => { this.selectPartEvent(event) }}>
                        <option value="">Select Part</option>
                        {
                            dropdownParts.map((part, index) => (
                            <option key={index} value={part.id} id={part.id}>{part.brand} {part.partNumber}</option>))
                         }
                    </select> 
                )
            }
            return(<div></div>)
        }
    
        const makePartTypeDropdown = () => {
            return (
                    partTypes.map((partType, index) => (
                        <option key={index} value={partType} id={index}>{partType}</option>
                    ))
            );  
        };  

        return(
            <div className="text-center">
                <select  name="part-type-dropdown" value={selectedPartType} required className="custom-select w-25 mb-3 mr-2"
                        onChange={(event) => { this.selectPartTypeEvent(event) }}>
                    <option value="">Select Part Type</option>
                    {makePartTypeDropdown()}
                </select>
                {makePartsDropDown()}
            </div>
        )
    }
}

export default MachinePartsDropdown;
