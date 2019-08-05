import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
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
      allParts: [],
    }

    static propTypes = {
      partTypes: PropTypes.array,
      selectedMachineId: PropTypes.number,
      isEditingPart: PropTypes.bool,
      showParts: PropTypes.bool,
      getPartsByMachine: PropTypes.func,
      showAddParts: PropTypes.func,
      machineParts: PropTypes.array,
      currentUser: PropTypes.object,
      selectedPartToEdit: PropTypes.object,
      addPart: PropTypes.bool,
      deletePart: PropTypes.func,
    }

    getAllParts = () => {
      partRequests.getAllParts()
        .then((allParts) => {
          this.setState({ allParts });
        });
    }

    checkExistingParts = (e) => {
      e.preventDefault();
      const myPart = { ...this.state.newPart };
      const allParts = [...this.state.allParts];
      const filteredParts = allParts.filter(part => part.brand.toLowerCase() === myPart.brand.toLowerCase()
                                                && part.partNumber.toLowerCase() === myPart.partNumber.toLowerCase());
      if (filteredParts.length > 0) {
        const existingPartId = filteredParts[0].id;
        this.checkExistingMachineParts(existingPartId);
      } else {
        this.formSubmit(e);
      }
    }

    checkExistingMachineParts = (partId) => {
      const { machineParts } = this.props;
      const filteredMachineParts = machineParts.filter(part => part.id === partId);
      if (filteredMachineParts.length > 0) {
        this.toggleEvent();
      } else {
        this.createMachinePart(partId);
      }
    }

    selectAddPartType = (e) => {
      const selectedAddPartType = e.target.value * 1;
      this.setState({ selectedAddPartType });
    }

    toggleEvent = () => {
      this.props.showAddParts();
      this.setState({ newPart: defaultPart });
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
      const {
        selectedMachineId, isEditingPart, currentUser, getPartsByMachine,
      } = this.props;
      const { selectedAddPartType } = this.state;
      const myPart = { ...this.state.newPart };
      const myMachinePart = { ...this.state.newMachinePart };
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
                getPartsByMachine(selectedMachineId);
                this.toggleEvent();
              });
          });
      } else {
        partRequests.updatePart(myPart.id, myPart)
          .then((part) => {
            getPartsByMachine(selectedMachineId);
            this.toggleEvent();
          });
      }
    };

    createMachinePart = (partId) => {
      const { selectedMachineId, getPartsByMachine } = this.props;
      const myMachinePart = { ...this.state.newMachinePart };
      myMachinePart.partId = partId;
      myMachinePart.machineId = selectedMachineId;
      machinePartRequests.createMachinePart(myMachinePart)
        .then(() => {
          this.setState({ newMachinePart: defaultMachinePart });
          getPartsByMachine(selectedMachineId);
          this.toggleEvent();
        });
    }

    componentDidMount() {
      this.getAllParts();
    }

    componentWillReceiveProps(props) {
      const { isEditingPart, selectedPartToEdit } = props;
      if (isEditingPart) {
        const selectedAddPartType = selectedPartToEdit.typeId;
        this.setState({
          newPart: selectedPartToEdit,
          selectedAddPartType,
        });
      }
    }

    render() {
      const {
        partTypes, addPart, isEditingPart, deletePart,
      } = this.props;

      const { selectedAddPartType } = this.state;

      const newPart = { ...this.state.newPart };

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

      const makePartTypeDropdown = () => (
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="partType-label input-group-text">Part Type:</div>
                    </div>
                    <select name="part" required className="custom-select" value={selectedAddPartType}
                            onChange={(event) => { this.selectAddPartType(event); }}>
                    <option value="">Select Part Type</option>
                        {
                        partTypes.map((partType, i) => (<option key={i}value={i + 1}>{partType}</option>))
                        }
                    </select>
                </div>
      );

      const makeButtons = () => {
        if (isEditingPart) {
          return (
                    <div className="text-center">
                        <button className="bttn-pill add-btn mx-auto mb-2" title="Submit Part">
                            <i className="fas fa-car"></i>
                        </button>
                        <button id='part-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={deletePart} title="Delete Part">
                            <i className="part-delete-btn fas fa-trash"></i>
                        </button>
                    </div>
          );
        } return (
                <div className="text-center">
                    <button className="bttn-pill add-btn mx-auto mb-2" title="Submit Part">
                        <i className="fas fa-car"></i>
                    </button>
                </div>
        );
      };

      return (
            <Modal isOpen={addPart} className="modal-lg">
                <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{makeHeader()}</ModalHeader>
                    <ModalBody className="text-center modal-body" id="part-modal">
                        <div className="mb-3">
                            <div className="reg-container d-flex animated fadeIn">
                                <form className="row form-container border border-dark rounded mx-auto mt-3" onSubmit={this.checkExistingParts}>
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
                                        {makeButtons()}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
            </Modal>
      );
    }
}

export default AddEditPart;
