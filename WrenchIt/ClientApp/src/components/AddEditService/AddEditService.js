import React from 'react';
import serviceRequests from '../../helpers/data/serviceRequests';
import servicePartRequests from '../../helpers/data/servicePartRequests';
import MachinePartsDropdown from '../MachinePartsDropdown/MachinePartsDropdown'
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

  const defaultServicePart = {
      serviceId: 0,
      partId: 0,
      installDate: new Date(),
  }

class AddEditService extends React.Component{
    modalMounted = false;

    static propTypes = {
        isEditing: PropTypes.bool,
        selectedMachine: PropTypes.object,
        currentUser: PropTypes.object,
        selectedService: PropTypes.object,
        selectedParts: PropTypes.array,
        selectPart: PropTypes.func,
        serviceParts: PropTypes.array,
    }

    state = {
        newService: defaultService,
        serviceDate: new Date(),
        installDate: new Date(),
        checked: true,
        newServicePart: defaultServicePart,
    }

    deleteServiceEvent = () => {
        this.props.deleteService()
    }

    editServiceEvent = () => {
        this.props.editService()
    }

    removePartEvent = (e) => {
        const partId = e.target.id * 1;
        this.props.removePart(partId);
    }

    handleCheckbox = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked })
    }

    checkServiceParts = () => {
        const {serviceParts} = this.props;
        const newServicePart = {...this.state.newServicePart};
        return serviceParts.filter(sp => {
            if(sp.partId === newServicePart.partId && sp.serviceId === newServicePart.serviceId) {
                return true;
            } else {
                return false;
            }
        }).length;

    }

    addServicePart = () => {
        const newServicePart = {...this.state.newServicePart};
        const {isEditing} = this.props;
        if(isEditing) {
            const partCheck = this.checkServiceParts();
            if(!partCheck) {
                servicePartRequests.createServicePart(newServicePart);
            };
        } else {
            servicePartRequests.createServicePart(newServicePart);
        };
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
        const { isEditing, selectedMachine } = this.props;
        const {checked, serviceDate} = this.state;
        const myService = { ...this.state.newService };
        myService.serviceDate = serviceDate;
        myService.machineId = selectedMachine.id;
        myService.tireRotation = checked;
        if (isEditing === false) {
            this.setState({ newService: defaultService });
            serviceRequests.createService(myService)
                .then((service) => {
                    const serviceId = service.data.id;
                    const {selectedParts} = this.props;
                    let myServicePart = {};
                    myServicePart.serviceId = serviceId;
                    myServicePart.installDate = service.data.serviceDate;
            
                    selectedParts.forEach(part => {
                        let partId = part.id;
                        myServicePart.partId = partId;

                        this.setState({ newServicePart: myServicePart })

                        this.addServicePart();
                    });
                    this.props.routeToServiceHistory();
                });
        } else {
          serviceRequests.updateService(myService.id, myService)
          .then((service) => {
            const serviceId = service.data.id;
            const {selectedParts} = this.props;
            let myServicePart = {};
            myServicePart.serviceId = serviceId;
            myServicePart.installDate = service.data.serviceDate;
    
            selectedParts.forEach(part => {
                let partId = part.id;
                myServicePart.partId = partId;

                this.setState({ newServicePart: myServicePart })

                this.addServicePart();
            });
            this.editServiceEvent();
        });
        }
    };

    componentDidMount() {
        const { currentUser } = this.props;
        this.modalMounted = !!currentUser.id;
        if (this.modalMounted) {
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
        const { 
                isEditing,
                selectedMachine,
                selectedParts,
                partTypes,
                selectPartType,
                selectedPartType,
                selectedPart,
                dropdownParts,
                selectPart,
                selectedService,
                isDetail,
            } = this.props;

        const {serviceDate, checked } = this.state;

        const newService = {...this.state.newService};

        const formatMDYDate = (date) => {
            const inputDate = new Date(date);
            const month = inputDate.getMonth() + 1;
            const day = inputDate.getDate();
            const year = inputDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
          };

        const makeSelectedParts = () => {
            if(isDetail && !isEditing){
                return(
                selectedParts.map((p,index) => (
                    <div  key={index} className="mr-2 selected-parts" id={p.id}>
                        {p.brand} {p.partNumber}
                    </div>  
                ))                      
                )
            }
            return(
                selectedParts.map((p,index) => (
                    <span  key={index} className="mr-2 selected-parts" onClick={this.removePartEvent} id={p.id}>
                        {p.brand} {p.partNumber}
                    </span>  
                ))
            )
        }

        const makeButtons = () => {
            if (isDetail) {
                return (
                    <div>
                        <button id='service-edit' type="button" className="bttn-pill edit-btn ml-2" onClick={this.editServiceEvent} title="Edit Service">
                            <i className="far fa-edit fa-1x"/>
                        </button>
                        <button id='service-delete' type="button" className="bttn-pill delete-btn ml-2 mr-2" onClick={this.deleteServiceEvent} title="Delete Service">
                            <i className="machine-delete-btn fas fa-trash fa-1x"></i>
                        </button>
                    </div>                
                )
            }
        }

          const makeServiceCard = () => {
              if(isDetail && !isEditing){
                  return(
                    <div className="service-card border border-dark rounded animated fadeIn w-75 mt-5 mx-auto" id={selectedService.id}>
                        <h3 className="text-center profile-header">{formatMDYDate(selectedService.serviceDate)}</h3>
                        <div className="ml-1">Oil Type: {selectedService.oil}</div>
                        <div className="ml-1">Oil Quantity: {selectedService.oilQuantity} Quarts</div>
                        <div className="ml-1">Tire Pressure: {selectedService.tirePressure}</div>
                        <div className="ml-1">Mileage: {selectedService.mileage}</div>
                        <div className="ml-1">Notes: {selectedService.notes}</div>
                        <div>Selected Parts: {makeSelectedParts()}</div>
                        {makeButtons()}
                    </div>
                  )
              }
              return(
                <form className="row form-container border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
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
                    <div className="form-check text-center">
                        <input type="checkbox" onChange={this.handleCheckbox} checked={checked} className="form-check-input" id="tireRotation"/>
                        <label className="form-check-label">Tire Rotation?</label>
                    </div>
                    <div id="serviceDate" className="text-center">
                        <label>Service Date</label>
                        <DatePicker
                        className="ml-3"
                        selected={serviceDate}
                        onChange={this.handleServiceDateChange}
                        />
                    </div>
                    <h3 className="text-center mt-5">Select Parts For Service</h3>
                    <MachinePartsDropdown
                        partTypes = {partTypes}
                        selectedPart = {selectedPart}
                        selectedPartType = {selectedPartType}
                        selectPartType = {selectPartType}
                        dropdownParts ={dropdownParts}
                        selectPart={selectPart}
                    />
                    <div className="text-center mx-auto">
                        <h5 className="mr-2">Selected Parts: (Click To Remove)</h5>
                        {makeSelectedParts()}
                    </div>
                    <div className="text-center">
                        <button className="bttn-pill user-add-btn mx-auto mb-2" title="Submit Service">
                            <i className="fas fa-tools fa-2x"></i>
                        </button>
                    </div>                                
                </div>
            </form>
              )
          }

        return(
            <div className="col">
                <div className="">
                    <div className="service-container d-flex animated fadeIn">
                        {makeServiceCard()}
                    </div>    
                </div>   
        </div>
        )
    }
}

export default AddEditService;
