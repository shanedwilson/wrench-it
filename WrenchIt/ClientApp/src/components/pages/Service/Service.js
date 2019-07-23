import React from 'react';
import machineRequests from '../../../helpers/data/machineRequests';
import partTypeRequests from '../../../helpers/data/partTypeRequests';
import partRequests from '../../../helpers/data/partRequests';
import AddEditService from'../../AddEditService/AddEditService';
import MachinePartsDropdown from '../../MachinePartsDropdown/MachinePartsDropdown'

class Service extends React.Component{
    serviceMounted = false;

    state = {
        selectedMachine: {},
        partTypes: [],
        selectedParts: [],
        machineParts: [],
        parts: [],
        dropdownParts: [],
        isService: true,
        modal: false,
        isEditing: false,
        selectedPartType: "",
        Oil: 0,
        OilFilter: 0,
        SparkPlug: 0,
        AirFilter: 0,
        CabinFilter: 0,
        BrakePads: 0,
        Battery: 0,
        Belt: 0,
        WiperLeft: 0,
        WiperRight: 0,
        HeadLight: 0,
        TurnLight: 0,
        TailLight: 0,
        SelectedMachineId: 0,
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

    selectPartType = (e) => {
        const selectedPartType = e.currentTarget.value;
        const partType = e.currentTarget.id * 1;
        const { machineParts }= this.state;
        let dropdownParts = [];
        machineParts.forEach(mp => {
            if(mp.typeId === partType + 1){
                dropdownParts.push(mp);
            }
        });
        this.setState({ selectedPartType });
        this.setState({ dropdownParts });
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
                this.setState({ SparkPlug: partId });
                break;
            case 4:
                this.setState({ AirFilter: partId });
                break;
            case 5:
                this.setState({ CabinFilter: partId });
                break;
            case 6:
                this.setState({ BrakePads: partId });
                break;
            case 7:
                this.setState({ Battery: partId });
                break;
            case 8:
                this.setState({ Belt: partId });
                break;
            case 9:
                this.setState({ WiperLeft: partId });
                break;
            case 10:
                this.setState({ wiperRight: partId })
                break;
            case 11:
                this.setState({ HeadLight: partId });
                break;
            case 12:
                this.setState({ TurnLight: partId });
                break;
            case 13:
                this.setState({ TailLight: partId });
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

        const dropdownParts = [...this.state.dropdownParts];

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
                    partTypes = {partTypes}
                    selectPartType = {this.selectPartType}
                    selectedPartType = {selectedPartType}
                    dropdownParts = {dropdownParts}
                />
                {/* <h3 className="text-center mt-5">Select Parts For Service</h3>
                <MachinePartsDropdown
                    partTypes = {partTypes}
                    machineParts = {machineParts}
                    selectedPartType = {selectedPartType}
                    selectPart = {this.selectPart}
                    Oil ={Oil}
                    OilFilter={OilFilter}
                /> */}
            </div>
        )
    }
}

export default Service;