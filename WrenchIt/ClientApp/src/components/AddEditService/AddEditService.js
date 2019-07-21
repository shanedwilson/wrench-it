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

        const newService = {...this.state};

        const makeHeader = () => {
            if (isEditing) {
              return (
                <div>Edit Sercice For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
              );
            }
            return (
              <div>Add Sercice For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
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
                            <div className="form col-11 mt-2">
                                <div className="col-auto form-lines p-0">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend w-10">
                                        <div className="input-group-text">Oil</div>
                                        </div>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="oil"
                                        placeholder={selectedMachine.oil}
                                        value={newService.oil}
                                        onChange={this.oilChange}
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
                                        placeholder={selectedMachine.oilQuantity}
                                        value={newService.oilQuantity.make}
                                        onChange={this.oilQuantityChange}
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
                                        placeholder={selectedMachine.tirePressure}
                                        value={newService.tirePressure}
                                        onChange={this.tirePressureChange}
                                        required
                                        />
                                    </div>
                                </div>
                                <div className="col-auto form-lines p-0">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                        <div className="input-group-text">Current Mileage</div>
                                        </div>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="serviceInterval"
                                        placeholder="50000"
                                        value={newService.serviceInterval}
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

export default AddEditService;
