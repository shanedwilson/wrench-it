import React from 'react';
import serviceRequests from '../../helpers/data/serviceRequests';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';

import './AddEditService.scss';
import "react-datepicker/dist/react-datepicker.css";

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
        selectedMachine: PropTypes.object,
        toggleServiceModal: PropTypes.func,
        currentUser: PropTypes.object,
        selectedService: PropTypes.object,
        selectedParts: PropTypes.array,
    }

    state = {
        newService: defaultService,
        serviceDate: new Date(),
        checked: true,
        selectedParts: [],
    }

    toggleEvent = () => {
        this.props.toggleServiceModal();
    }

    removePartEvent = (e) => {
        const partId = e.target.id * 1;
        this.props.removePart(partId);
    }

    handleCheckbox = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked })
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
        tempService[name] = e.target.value * 1;
        this.setState({ newService: tempService });
    }
  
    oilChange = e => this.formFieldStringState('oil', e);
  
    oilQuantityChange = e => this.formFieldNumberState('oilQuantity', e);

    tirePressureChange = e => this.formFieldNumberState('tirePressure', e);
    
    mileageChange = e => this.formFieldNumberState('mileage', e);

    notesChange = e => this.formFieldStringState('notes', e);

    handleServiceDateChange = (date) => {
        this.setState({ serviceDate: new Date(date) });
      }

    formSubmit = (e) => {
        e.preventDefault();
        const { isEditing, selectedService, selectedMachine } = this.props;
        const {checked, serviceDate} = this.state;
        const myService = { ...this.state.newService };
        myService.serviceDate = serviceDate;
        myService.machineId = selectedMachine.id;
        myService.tireRotation = checked;
        if (isEditing === false) {
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
        const { isEditing, selectedService, selectedParts } = props;
        if (isEditing) {
            this.setState({
            newService: selectedService,
            serviceDate: new Date(props.selectedService.serviceDate),
            selectedParts: selectedParts,
            });
        }
        this.setState({ selectedParts });
    }

    render(){
        const { isEditing, selectedMachine } = this.props;

        const {serviceDate, checked} = this.state;

        const newService = {...this.state.newService};

        const selectedParts = [...this.state.selectedParts]

        const makeHeader = () => {
            if (isEditing) {
              return (
                <div className="text-center">Edit Sercice For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
              );
            }
            return (
              <div className="text-center">Add Sercice For Your {selectedMachine.year} {selectedMachine.make} {selectedMachine.model}</div>
            );
          };

          const makeSelectedParts = () => {
            return(
                selectedParts.map(p => (
                    <div  className="mr-2" onClick={this.removePartEvent} id={p.id}>
                        {p.brand} {p.partNumber}
                    </div>  
                ))
            )
          }

        return(
            <div className="col">
            <h1 class-name="service-header">{makeHeader()}</h1>
                <div className="">
                    <div className="reg-container d-flex animated fadeIn">
                        <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
                            <h3 className="reg-title mx-auto">Please Enter Your Service Info:</h3>
                            <div className="form col-11 mt-2 mx-auto">
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
                                <div className="col-auto form-lines p-0">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                        <div className="input-group-text">Notes</div>
                                        </div>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="notes"
                                        placeholder=""
                                        value={newService.notes}
                                        onChange={this.notesChange}
                                        required
                                        />
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" onChange={this.handleCheckbox} checked={checked} className="form-check-input" id="tireRotation"/>
                                    <label className="form-check-label">Tire Rotation?</label>
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
                                    <button className="bttn-pill user-add-btn mx-auto mb-2" title="Submit Service">
                                        <i className="fas fa-tools fa-2x"></i>
                                    </button>
                                </div>                                
                            </div>
                            <div className="text-center mx-auto">
                                <h5 className="mr-2">Selected Parts: (Click To Remove)</h5>
                                {makeSelectedParts()}
                            </div>
                        </form>
                    </div>    
                </div>   
        </div>
        )
    }
}

export default AddEditService;
