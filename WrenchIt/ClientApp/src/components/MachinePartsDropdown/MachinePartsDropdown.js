import React from 'react';
import PropTypes from 'prop-types';

class MachinePartsDropdown extends React.Component {
    static propTypes = {
      partTypes: PropTypes.array,
      dropdownParts: PropTypes.array,
      selectedPartType: PropTypes.number,
      selectedPart: PropTypes.number,
      selectPart: PropTypes.func,
      selectPartType: PropTypes.func,
      isGarage: PropTypes.bool,
    }

    selectPartEvent = (e) => {
      this.props.selectPart(e);
    }

    selectPartTypeEvent = (e) => {
      this.props.selectPartType(e);
    }

    render() {
      const {
        partTypes, selectedPartType, selectedPart, dropdownParts, isGarage,
      } = this.props;

      const makePartsDropDown = () => {
        if (dropdownParts.length > 0 && isGarage) {
          return (
                    <select name="parts-dropdown" value={selectedPart} className="custom-select w-25 mb-3 mr-2 shadow-lg"
                        onChange={(event) => { this.selectPartEvent(event); }}>
                        <option value="">Select Part To Edit</option>
                        {
                            dropdownParts.map(part => (
                            <option key={part.id} value={part.id} id={part.id}>{part.brand} {part.partNumber}</option>))
                         }
                    </select>
          );
        }
        if (dropdownParts.length > 0) {
          return (
                    <select name="parts-dropdown" value={selectedPart} className="custom-select w-25 mb-3 mr-2 shadow-lg"
                    onChange={(event) => { this.selectPartEvent(event); }}>
                        <option value="">Select Part</option>
                        {
                            dropdownParts.map(part => (
                            <option key={part.id} value={part.id} id={part.id}>{part.brand} {part.partNumber}</option>))
                        }
                    </select>
          );
        }
        return (<div></div>);
      };

      const makePartTypeDropdown = () => (
        partTypes.map((partType, index) => (
                        <option key={index} value={index}>{partType}</option>
        ))
      );

      return (
            <div className="text-center">
                <select name="part-type-dropdown" value={selectedPartType} className="custom-select w-25 mb-3 mr-2 shadow-lg"
                        onChange={(event) => { this.selectPartTypeEvent(event); }}>
                    <option value="">Select Part Type</option>
                    {makePartTypeDropdown()}
                </select>
                {makePartsDropDown()}
            </div>
      );
    }
}

export default MachinePartsDropdown;
