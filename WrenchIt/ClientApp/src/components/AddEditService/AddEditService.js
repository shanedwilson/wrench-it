import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
import serviceRequests from '../../helpers/data/serviceRequests';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import './AddEditService.scss';

const defaultService = {
    machineId: 0,
    oil: '',
    oilQuantity: 0,
    tirePressure: 0,
    mileage: 0,
    tireRotation: false,
    serviceDate: new Date(),
    notes: '',
  };

class AddEditService extends React.Component{
    modalMounted = false;

    static propTypes = {
        isEditing: PropTypes.bool,
        modal: PropTypes.bool,
        selectedMachine: PropTypes.object,
        toggleServiceModal: PropTypes.func,
        currentUser: PropTypes.object,
        selectedService: PropTypes.object,
    }

    state = {
        newService: defaultService,
        serviceDate: new Date(),
    }

    toggleEvent = () => {
        this.props.toggleServiceModal();
    }

    formFieldStringState = (name, e) => {
        e.preventDefault();
        const tempService = { ...this.state.newService };
        tempService[name] = e.target.value;
        this.setState({ newService: tempService });
    }

    formFieldNumberState = (name, e) => {
        e.preventDefault();
        const tempService = { ...this.state.newService };
        tempService[name] = e.target.value;
        this.setState({ newService: tempService });
    }
  
    oilChange = e => this.formFieldStringState('oil', e);
  
    oilQuantityChange = e => this.formFieldNumberState('oilQuantity', e);

    tirePressureChange = e => this.formFieldNumberState('tirePressure', e);
    
    mileageChange = e => this.formFieldNumberState('mileage', e);

    handleServiceDateChange = (date) => {
        this.setState({ serviceDate: new Date(date) });
      }

    formSubmit = (e) => {
        e.preventDefault();
        const { isEditing, selectedService } = this.props;
        const serviceDate = {...this.state};
        const myService = { ...this.state.newSevice };
        myService.serviceDate = serviceDate;
        if (isEditing === false) {
            myService.ownerId = this.props.currentUser.id;
          this.setState({ newService: defaultService });
          serviceRequests.createService(myService)
            .then(() => {
              this.toggleEvent();
            });
        } 
        else {
          serviceRequests.updateService(myService.id, myService)
            .then(() => {
                this.toggleEvent();
            });
        }
    };

    componentDidMount() {
        const { currentUser } = this.props;
        this.modalMounted = !!currentUser.id;
        if (this.modalMounted) {
            console.log('');
        }
    }
        
    componentWillReceiveProps(props) {
        const { isEditing, selectedService } = props;
        if (isEditing) {
            this.setState({
            newService: selectedService,
            serviceDate: new Date(props.selectedService.serviceDate),
            });
        }
    }

    render(){
        const { isEditing, modal, selectedMachine } = this.props;

        const {serviceDate} = this.state;

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
                                        placeholder={selectedMachine.oilType}
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
                                        value={newService.oilQuantity}
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
                                        value={newService.mileage}
                                        onChange={this.mileageChange}
                                        required
                                        />
                                    </div>
                                </div>
                                <div id="serviceDate">
                                    <label>Service Date</label>
                                    <DatePicker
                                    className="ml-3"
                                    selected={serviceDate}
                                    onChange={this.handleServiceDateChange}
                                    />
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
