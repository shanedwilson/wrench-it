import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';
import partRequests from '../../../helpers/data/partRequests';
import AddEditService from'../../AddEditService/AddEditService';
import MachinePartsDropdown from '../../MachinePartsDropdown/MachinePartsDropdown'

class Service extends React.Component{
    serviceMounted = false;
    // selectedParts = [];


    state = {
        selectedMachine: {},
        partTypes: [],
        selectedParts: [],
        machineParts: [],
        parts: [],
        isService: true,
        modal: false,
        isEditing: false,
        selectedPartType: 0,
        Oil: 0,
        OilFilter: 0,
        sparkPlug: 0,
        airFilter: 0,
        cabinFilter: 0,
        brakePads: 0,
        battery: 0,
        belt: 0,
        wiperLeft: 0,
        wiperRight: 0,
        headLight: 0,
        turnLight: 0,
        tailLight: 0,
        selectedMachineId: 0,
    }

    getAllParts = () => {
        const parts = [...this.state.parts];
        const partTypes = [...this.state.partTypes];
        partRequests.getAllParts()
        .then((parts) => {
            this.setState({ parts });
        });
        parts.map(p => (
            partTypes.map((pt, i) => pt.typeId === i +1 (
                p.typeName = pt
            ))
        ))
    }

    getAllPartTypes = () => {
        partTypeRequests.getAllPartTypes()
          .then((partTypes) => {
            this.setState({ partTypes });
          });
      }

    getPartsByMachine = (id) => {
        partRequests.getPartsByMachineId(id)
            .then((machineParts) => {
                this.setState({ machineParts });
            });
      }

    getSingleMachineById = (id) => {
        machineRequests.getSingleMachine(id)
        .then((machine) => {
            this.setState({ selectedMachine: machine.data });
            this.getPartsByMachine(machine.data.id);
        })
    }

    selectPart = (e) => {
        const { machineParts }= this.state;
        const selectedParts = [...this.state.selectedParts]
        const partId = e.target.value * 1;
        const filteredParts = machineParts.filter(part => part.id === partId);
        const partType = filteredParts[0].typeId;
        switch (partType) {
            case 1:
                this.setState({ Oil: partId });
                break;
            case 2:
                this.setState({ OilFilter: partId });
                break;
            case 3:
                this.setState({ sparkPlug: partId });
                break;
            case 4:
                this.setState({ airFilter: partId });
                break;
            case 5:
                this.setState({ cabinFilter: partId });
                break;
            case 6:
                this.setState({ brakePads: partId });
                break;
            case 7:
                this.setState({ battery: partId });
                break;
            case 8:
                this.setState({ belt: partId });
                break;
            case 9:
                this.setState({ wiperLeft: partId });
                break;
            case 10:
                this.setState({ wiperRight: partId })
                break;
            case 11:
                this.setState({ headLight: partId });
                break;
            case 12:
                this.setState({ turnLight: partId });
                break;
            case 13:
                this.setState({ tailLight: partId });
                break;
            default:
       }
       selectedParts.push(filteredParts[0]);
       this.setState({ selectedParts });
    }

    toggleServiceModal = () => {
        const { modal } = this.state;
        this.setState({ modal: !modal });
    }

    removePart = (id) => {
        const {selectedParts} = this.state;
        selectedParts.forEach((sp, i) =>{
            const index = selectedParts.findIndex(sp => sp.id === id);
            if(index > -1){
                selectedParts.splice(index, 1);
                let stuff = { selectedParts };
                stuff[`${sp.nameType}`] = 0;

                this.setState(stuff);
            };
        });
    }

    componentDidMount(){
        const { currentUser } = this.props;
        this.serviceMounted = !!currentUser.id;
        const machineId = this.props.match.params.id

        if (this.serviceMounted) {
            this.getSingleMachineById(machineId * 1);
            this.getAllPartTypes();
            this.getAllParts();
        }
    }

    render(){
        const { selectedMachine, isEditing, modal, selectedPartType, OilFilter, Oil, selectedParts } = this.state;

        const partTypes = [...this.state.partTypes];

        const machineParts = [...this.state.machineParts];

        const { currentUser } = this.props;

        return(
            <div className="w-75 mx-auto">
                <AddEditService
                    isEditing = {isEditing}
                    modal = {modal}
                    selectedMachine ={selectedMachine}
                    toggleServiceModal = {this.toggleServiceModal}
                    currentUser = {currentUser}
                    selectedParts = {selectedParts}
                    removePart = {this.removePart}
                />
                <h3 className="text-center mt-5">Select Parts For Service</h3>
                <MachinePartsDropdown
                    partTypes = {partTypes}
                    machineParts = {machineParts}
                    selectedPartType = {selectedPartType}
                    selectPart = {this.selectPart}
                    Oil ={Oil}
                    OilFilter={OilFilter}
                />
            </div>
        )
    }
}

export default Service;