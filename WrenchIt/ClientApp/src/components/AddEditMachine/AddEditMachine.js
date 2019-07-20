import React from 'react';
import machineTypeRequests from '../../helpers/data/machineTypeRequests';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
  import PropTypes from 'prop-types';

  import './AddEditMachine.scss';

  const defaultMachine = {
    year: 1970,
    make: '',
    model: '',
    trim: '',
    typeId: 0,
    oilType: '',
    oilQuantity: 0,
    tireSize: '',
    tirePressure: 32,
    serviceInterval: 3000,
  };

  class AddEditMachine extends React.Component{
    modalMounted = false;

    state = {
        machineTypes: [],
        newMachine: defaultMachine,
        selectedMachineType: 0,
    }

    static propTypes = {
        currentUser: PropTypes.object,
    }

    getMachineTypes = () => {
        machineTypeRequests.getAllMachineTypes()
          .then((machineTypes) => {
            this.setState({ machineTypes });
          });
      }

    toggleEvent = () => {
        const { toggleMachineModal } = this.props;
        toggleMachineModal();
    }

    formFieldStringState = (name, e) => {
        e.preventDefault();
        const tempMachine = { ...this.state.newMachine };
        tempMachine[name] = e.target.value;
        this.setState({ newMachine: tempMachine });
    }

    formFieldNumberState = (name, e) => {
        e.preventDefault();
        const tempMachine = { ...this.state.newMachine };
        tempMachine[name] = e.target.value;
        this.setState({ newMachine: tempMachine });
    }

    yearChange = e => this.formFieldNumberState('year', e);
  
    makeChange = e => this.formFieldStringState('make', e);
  
    modelChange = e => this.formFieldStringState('model', e);
  
    trimChange = e => this.formFieldStringState('trim', e);
  
    typeIdChange = e => this.formFieldNumberState('typeId', e);
  
    oilTypeChange = e => this.formFieldStringState('oilType', e);
  
    oilQuantityChange = e => this.formFieldNumberState('oilQyantity', e);

    tireSizeChange = e => this.formFieldStringState('tireSize', e);

    tirePressureChange = e => this.formFieldNumberState('tirePressure', e);
    
    serviceIntervalChange = e => this.formFieldNumberState('serviceInterval', e);

    selectMachineType = (e) => {
        const myMachine = { ...this.state.newMachine };
        myMachine.typeId = e.target.value;
        this.setState({ selectedMachineType: e.target.value });
      }

    componentDidMount(prevProps) {
        const { currentUser } = this.props;
        this.modalMounted = !!currentUser.id;
        if (this.modalMounted) {
            this.getMachineTypes();
        }
        // const { isEditingAccount, paymentAccount } = this.props;
        // if (prevProps !== this.props && isEditingAccount) {
        //   this.setState({
        //     newMachineType: machineType,
        //     selectedPaymentType: paymentAccount.paymentTypeId,
        //   });
        // }
      }

    render(){
        const { selectedMachineType } = this.state;

        const newMachine = { ...this.stete };

        const machineTypes = { ...this.state };

        const { modal } = this.props;

        const makeMachineTypeDropdown = () => {
            let counter = 0;
            return (
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                      <div className="machineType-label input-group-text">Machine Type:</div>
                      </div>
                        <select name="machine" required className="custom-select" value={selectedMachineType}
                                onChange={(event) => { this.selectMachineType(event); this.typeIdChange(event); }}>
                        <option value="">Select Machine Type</option>
                          {
                            // machineTypes.map(machineType => (<option key={counter++}value={counter}>{machineType}</option>))
                          }
                        </select>
                    </div>
                    );
        };

        return(
            <Modal isOpen={modal} className="modal-lg">
                <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>Add/Edit Machine</ModalHeader>
                <ModalBody className="text-center modal-body" id="machine-modal">
                    <div className="border border-dark rounded">
                        <div className="reg-container d-flex animated fadeIn">
                            <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
                                <h3 className="reg-title mx-auto">Please Enter Your Machine's Info:</h3>
                                <div className="form col-11 mt-2">
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Year</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="year"
                                            placeholder="1870"
                                            value={newMachine.year}
                                            onChange={this.yearChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Make</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="make"
                                            placeholder="Plymouth"
                                            value={newMachine.make}
                                            onChange={this.makeChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Model</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="model"
                                            placeholder="Valiant"
                                            value={newMachine.model}
                                            onChange={this.modelChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Trim</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="trim"
                                            placeholder="Signet"
                                            value={newMachine.trim}
                                            onChange={this.trimChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        {makeMachineTypeDropdown()}
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Oil Type</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="oilType"
                                            placeholder="5w30"
                                            value={newMachine.oilType}
                                            onChange={this.oilTypeChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Oil Quantity</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="oilQuantity"
                                            placeholder="5"
                                            value={newMachine.oilQuantity}
                                            onChange={this.oilQuantityChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Tire Size</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="tireSize"
                                            placeholder="165/80R14"
                                            value={newMachine.tireSize}
                                            onChange={this.tireSizChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-auto form-lines p-0">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text">Tire Pressure</div>
                                            </div>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="tirePressure"
                                            placeholder="32"
                                            value={newMachine.tirePressure}
                                            onChange={this.tirePressureChange}
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                    <button className="bttn-pill user-add-btn mx-auto mb-2" title="Submit">
                                        <i className="fas fa-plus-circle" />
                                    </button>
                                    </div>
                                </div>
                             </form>
          </div>
                        <ModalFooter className="modal-footer">
                        <button onClick={this.toggleEvent} className="bttn-pill bttn-md bttn-danger mb-3">
                            Go Back
                        </button>
                        </ModalFooter>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default AddEditMachine
