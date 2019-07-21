import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
import PropTypes from 'prop-types';

class AddEditService extends React.Component{
    static propTypes = {
        isEditing: PropTypes.bool,
        modal: PropTypes.bool,
        selectedMachine: PropTypes.object,
        toggleServiceModal: PropTypes.func,
    }

    toggleEvent = () => {
        this.props.toggleServiceModal();
    }

    render(){
        const { isEditing, modal, selectedMachine } = this.props;

        const makeHeader = () => {
            if (isEditing) {
              return (
                <div>Edit Sercice For Your {selectedMachine.year} {selectedMachine.Make} {selectedMachine.Model}</div>
              );
            }
            return (
              <div>Add Sercice For Your {selectedMachine.year} {selectedMachine.Make} {selectedMachine.Model}</div>
            );
          };
        return(
            <Modal isOpen={modal} className="modal-lg">
            <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>{makeHeader()}</ModalHeader>
            <ModalBody className="text-center modal-body" id="machine-modal">
                <div className="">
                    <div className="reg-container d-flex animated fadeIn">
                        <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
                            <h3 className="reg-title mx-auto">Please Enter Your Service Info:</h3>
                            {/* <div className="form col-11 mt-2">
                                <div className="col-auto form-lines p-0">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend w-10">
                                        <div className="input-group-text">Year</div>
                                        </div>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        placeholder="1968"
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
                                        onChange={this.tireSizeChange}
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
                                <div className="col-auto form-lines p-0">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                        <div className="input-group-text">Service Interval</div>
                                        </div>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="serviceInterval"
                                        placeholder="3000"
                                        value={newMachine.serviceInterval}
                                        onChange={this.serviceIntervalChange}
                                        required
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                <button className="bttn-pill user-add-btn mx-auto mb-2" title="Submit">
                                    <i className="fas fa-plus-circle" />
                                </button>
                                </div>
                            </div> */}
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

export default AddEditService;
