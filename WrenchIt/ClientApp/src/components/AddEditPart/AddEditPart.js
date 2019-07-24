import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
import partRequests from '../../helpers/data/partRequests';
import machinePartRequests from '../../helpers/data/machinePartRequests';

import './AddEditPart.scss';

const defaultPart = {
  typeId: 0,
  brand: '',
  partNumber: '',
};

const defaultMachinePart = {
    machineId: 0,
    partId: 0,
  };

class AddEditPart extends React.Component {
    state = {
        newPart: defaultPart,
        newMachinePart: defaultMachinePart,
        selectedAddPartType: 1000,
    }

    static propTypes = {
        partTypes: PropTypes.array,
        selectedMachineId: PropTypes.number,
        isEditingPart: PropTypes.bool,
        showParts: PropTypes.bool,
        getPartsByMachine: PropTypes.func,
        showAddParts: PropTypes.func,
    }

    toggleEvent = () => {
        this.props.showAddParts();
    }

    selectAddPartType = (e) => {
        const selectedAddPartType = e.target.value * 1;
        this.setState({ selectedAddPartType });
    }

    formFieldStringState = (name, e) => {
        e.preventDefault();
        const tempPart = { ...this.state.newPart };
        tempPart[name] = e.target.value;
        this.setState({ newPart: tempPart });
    }

    brandChange = e => this.formFieldStringState('brand', e);
  
    partNumberChange = e => this.formFieldStringState('partNumber', e);

    formSubmit = (e) => {
        e.preventDefault();
        const { selectedMachineId, isEditingPart, currentUser, getPartsByMachine } = this.props;
        const { selectedAddPartType } = this.state;
        const myPart = { ...this.state.newPart };
        const myMachinePart = {...this.state.newMachinePart};
        if (isEditingPart === false) {
            myPart.ownerId = currentUser.id;
            myPart.typeId = selectedAddPartType;
          this.setState({ newPart: defaultPart });
          partRequests.createPart(myPart)
            .then((part) => {
                const partId = part.data.id;
                myMachinePart.partId = partId;
                myMachinePart.machineId = selectedMachineId;
                machinePartRequests.createMachinePart(myMachinePart)
                .then(() => {
                    this.setState({ newMachinePart: defaultMachinePart });
                    getPartsByMachine(selectedMachineId)
                })
            });
        }
        else {
                partRequests.updatePart(myPart.id, myPart)
                    .then((part) => {
                        getPartsByMachine(selectedMachineId)
                        this.toggleEvent();
            });
        }
    };

    componentWillReceiveProps(props) {
        const { isEditingPart, selectedPartToEdit } = props;
        if (isEditingPart) {
            const selectedAddPartType = selectedPartToEdit.typeId - 1;
            this.setState({
            newPart: selectedPartToEdit,
            selectedAddPartType: selectedAddPartType,
            });
        }
    }

    render(){
        const { partTypes, addPart, isEditingPart } = this.props;

        const { selectedAddPartType } = this.state;

        const newPart = {...this.state.newPart};

        const makeHeader = () => {
            if (isEditingPart) {
              return (
                <div>Edit Your Part</div>
              );
            }
            return (
              <div>Add A Part</div>
            );
          };

        const makePartTypeDropdown = () => {
            return (
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="partType-label input-group-text">Part Type:</div>
                    </div>
                    <select name="part" required className="custom-select" value={selectedAddPartType}
                            onChange={(event) => { this.selectAddPartType(event) }}>
                    <option value="">Select Part Type</option>
                        {
                        partTypes.map((partType, i) => (<option key={i}value={i}>{partType}</option>))
                        }
                    </select>
                </div>
            );
        };
        return(
            <Modal isOpen={addPart} className="modal-lg">
                <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{makeHeader()}</ModalHeader>
                    <ModalBody className="text-center modal-body" id="part-modal">
                        <div className="mb-3">
                            <div className="reg-container d-flex animated fadeIn">
                                <form className="row form-container border border-dark rounded mx-auto" onSubmit={this.formSubmit}>
                                    <h5 className="reg-title mx-auto">Please Enter The Parts Info:</h5>
                                    <div className="form col-11 mt-2 mx-auto">
                                        <div className="col-auto form-lines p-0">
                                            {makePartTypeDropdown()}
                                        </div>
                                        <div className="col-auto form-lines p-0">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend w-10">
                                                <div className="input-group-text">Brand</div>
                                                </div>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="brand"
                                                placeholder="Fram"
                                                value={newPart.brand}
                                                onChange={this.brandChange}
                                                required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-auto form-lines p-0">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend w-10">
                                                <div className="input-group-text">Part Number</div>
                                                </div>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="partNumber"
                                                placeholder="xxx123"
                                                value={newPart.partNumber}
                                                onChange={this.partNumberChange}
                                                required
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button className="bttn-pill user-add-btn mx-auto mb-2" title="Submit Part">
                                                <i className="fas fa-car fa-2x"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
            </Modal>            
        )
    }
}

export default AddEditPart;